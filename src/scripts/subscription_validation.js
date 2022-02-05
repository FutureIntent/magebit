
function validate(email, checkbox) {

    //check email presence
    if (!email) return { status: false, message:'Email address is required'}

    //check pattern
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email) !== true) return { status: false, message: "Please, provide a valid e-mail address" };

    //get domain and check if colombian???
    const emailArray = email.split('.');
    const domain = emailArray.pop();

    if (domain === "co") return {status: false, message: 'We are not accepting subscriptions from Colombia emails'}

    //check checkbox
    if (checkbox !== true) return { status: false, message: "You must accept the terms and conditions" };

    return {status: true, message: null};
}

export default validate;