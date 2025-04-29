import fs from 'fs';
import { FastifyInstance, } from 'fastify';
import { handler } from './defines';
import path from 'path';
import { WebSocket } from 'ws';



/**
 * Resolve đường dẫn file route từ data.type
 */
async function resolveRoutePath(type: string): Promise<string> {
    const possiblePaths = [
        path.join(__dirname, `${type}.ts`),
        path.join(__dirname, `${type}/index.ts`),
    ];

    // duyệt các đường dẫn có thể có tuần tự, Kiểm tra xem file có tồn tại không
    const possiblePath = possiblePaths.reduce((acc, possiblePath) => {
        // Kiểm tra xem file có tồn tại không
        if (!fs.existsSync(possiblePath)) {
            return acc;
        } else {
            return possiblePath;
        }
    }, '');
    if (possiblePath === '')
        throw new Error(`Route handler not found for type: ${type}`);
    else return possiblePath;
}


/**
 * Import và validate route handler
 */
async function importRouteHandler(routePath: string): Promise<handler> {
    console.log("import(routePath)", routePath);
    const module = await import(routePath);

    if (!module.default || typeof module.default !== 'function') {
        throw new Error(`Route handler must export a default function in ${routePath}`);
    }
    return module.default;
}


/**
 * Tự động route dựa trên data.type
 * 
 * Giá trị: data.type sẽ định nghĩa thư mục hoặc file cần load.
 * 
 * ví dụ: data.type = "detector" thì sẽ load "./detector/index.ts" hoặc "./detector.ts"
 * 
 * ví dụ: data.type = "detector/ai" thì sẽ load "./detector/ai/index.ts" hoặc "./detector/ai.ts"
 * 
 * phần data.values là thông tin cần thiết để thực thi route.
 * @param app - Fastify instance
 * @param data - Object chứa thông tin route và payload
 */
export async function autoRoute(app: FastifyInstance, ws: WebSocket, data: any) {
    if (!data?.type) {
        throw new Error('Missing required field: data.type');
    }
    try {
        // Kiểm tra xem data.type có hợp lệ không
        if (typeof data.type !== 'string') {
            throw new Error('data.type must be a string');
        }
        const routePath = await resolveRoutePath(data.type);
        const routeHandler = await importRouteHandler(routePath);

        await routeHandler(app, ws, data);
    } catch (err: any) {
        // console.error('Error in autoRoute:', err);
        ws.send(JSON.stringify({
            type: data.type,
            error: 'Route handler not found',
            message: err.message,
        }));
    }
}

export default autoRoute;
export { resolveRoutePath, importRouteHandler };
export { handler };

