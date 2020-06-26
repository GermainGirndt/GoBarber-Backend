import Appointment from '../models/Appointment';
// import { isEqual } from 'date-fns';

import { EntityRepository, Repository } from 'typeorm';

// typeorm 'Repository' has already some built in methods like:
// contructor, "all", "list" and "create"

@EntityRepository(Appointment)
class AppointmentsRespository extends Repository<Appointment> {
    // private appointments: Appointment[];

    // constructor() {
    //     this.appointments = [];
    // }

    public async findByDate(date: Date): Promise<Appointment | null> {
        // isEqual function -> check if dates are equal and returns true/false
        // const findAppointment = this.appointments.find(appointment => {
        //     console.log(date);
        //     console.log(appointment);
        //     return isEqual(date, appointment.date);
        // });

        const findAppointment = await this.findOne({
            where: { date },
        });

        console.log('find by date is being executed');

        // '||' behaves like an 'else'
        return findAppointment || null;
    }

    // defined typescript type with ': Appointment'
    // public create(provider: string, date: Date): Appointment {
    //     const appointment = new Appointment(provider, date);

    //     this.appointments.push(appointment);

    //     console.log('New appointment saved');
    //     console.log(this.appointments);

    //     return appointment;
    // }
}

export default AppointmentsRespository;
