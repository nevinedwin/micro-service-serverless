import twilio from 'twilio';

const accountSid = "AC4d3cd31383f115865ea0db23caed783a";
const authToken = "9ef220fe899a1477f28a0128ec808fd8";

const client = twilio(accountSid, authToken);

export const generateAccessCode = () => {

    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 100);
    return { code, expiry };
};


export const sendVerificationCode = async (code: number, phone: string) => {

    const respose = await client.messages.create({
        body: `Your verification code is ${code}. It will expire within 30 minutes.`,
        from: "+918129492297",
        to: phone.trim()
    });

    console.log(respose)
    return respose;
};