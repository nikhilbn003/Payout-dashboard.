import moment from "moment/moment";
import { ServerConfig } from "../../global/config";
import { POST,GET } from "../../utils/API";


export const payoutapi = async () => {
    try {
        const SERVERTYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
        const currentMonth =  new Date();
        let earnMonth = moment(currentMonth).subtract(2,'month');
        console.log("month",earnMonth.format('YYYY-MM'));
        const payload = {
            earn_month: earnMonth.format('YYYY-MM'),
        }
        const response = await POST(SERVERTYPE,`/Payouts/fetch?pageNumber=${1}&pageSize=${10}`,payload);
        return response;
    } catch (error) {
        console.error('Error fetching payouts:', error);
        return null;
    }
};

export const  Opportunities = async () => {
try {
    const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
    const response =  await GET(SERVER_TYPE, "/Opportunity/OppList")
    return response
    
} catch (error) {
    console.error('Error fetching Opportunity :', error);
        return null;
}
};

export const investments = async () => {
    try {
        const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
        const payload = {};
        const response =  await POST(SERVER_TYPE, "/Dashboard/getDashboard",payload)
        return response
        
    } catch (error) {
        console.error('Error fetching investments :', error);
            return null;
    }
}

export const Earnings = async () => {
    try {
        const SERVER_TYPE = ServerConfig.SERVER_TYPE.INTERNAL.TYPE;
    const response =  await GET(SERVER_TYPE, "/Earnings/fetch")
    return response
    } catch (error) {
        console.error('Error fetching Opportunity :', error);
        return null;
    }
}

