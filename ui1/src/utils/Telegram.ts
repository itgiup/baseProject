import axios from "axios";




const { log, error } = console;

export enum MESSAGETYPE {
    warning = "#ff9800",
    success = "#49c74e",
    error = "#ff3b30"
}


class Telegram {
    token: string

    [chat: string]: number

    constructor(token: string) {
        this.token = token
    }

    send(content: any, chat: string | number, type: MESSAGETYPE = MESSAGETYPE.success) {

        // let message = encodeURIComponent(`<code style="color: ${type}">${typeof (content) === "string" ? content : JSON.stringify(content)}</code>`);
        let message = encodeURIComponent(`${typeof (content) === "string" ? content : JSON.stringify(content)}`);
        let url = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=-${this[chat] || chat}&text=${message}&parse_mode=html`;

        let options = {
            'method': 'POST',
            'url': url
        };
        return axios(options)
            .then(response => response.data).then(data => {
                if (data.error_code) console.error("sentAlertTelegram error: " + data.description)
            })
        // .catch(err => {
        //     error(err)
        //     console.error("axios sentAlertTelegram error:", err.message)
        // });
    }
}

export default Telegram