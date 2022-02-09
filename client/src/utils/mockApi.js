
export const userLogin = async ({ stud_id, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stud_id === '19k-0280' && password === '1025508954') {
                resolve();
            } else {
                reject();
            }
        }, 3000);
    });
};