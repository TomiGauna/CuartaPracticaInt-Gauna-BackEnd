import ticketModel from '../dao/models/ticket.model.js';

class TicketsDAO {
    constructor() {
        this.ticketsModel = ticketModel;
    }

    createTicket = async (newFields) => {
        try {
            const newTicket = await this.ticketsModel.create(newFields);
            return newTicket;
        } catch (error) {
            throw new Error(`Failed to add ticket: ${error.message}`);
        }
    }

    getTicketByCode = async (ticketCode) => {
        try {
            const ticket = await this.ticketsModel.findOne({ code: ticketCode });
            return ticket;
        } catch (error) {
            throw new Error(`Failed to retrieve ticket: ${error.message}`);
        }
    }

}

export default TicketsDAO;