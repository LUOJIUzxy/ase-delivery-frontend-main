import QRCode from 'qrcode'

async function generateQrCode (text) {
    try {
        const code = await QRCode.toDataURL(text);
        return code;
    } catch (error) {
        // TODO: ALERT
        console.log(error);
        return '';
    }
};

export {
    generateQrCode
}