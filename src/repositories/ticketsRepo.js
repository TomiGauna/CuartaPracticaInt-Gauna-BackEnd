import TicketsDAO from "../daos/ticketsDAO.js";

export default class TicketsRepository {
    
    constructor() {
        this.dao = new TicketsDAO();
    }

    createTicket = async (newFields) => {
        const newTicket = await this.dao.createTicket(newFields);
        return newTicket;
    }

    getTicketByCode = async (ticketCode) => {
        const ticket = await this.dao.getTicketByCode(ticketCode);
        return ticket;
    }
}