import EventEmitter from "events";

class Service extends EventEmitter {
    [method: string]: any;
    start(params?: any) {

    }

    stop() {

    }
}

export default Service;