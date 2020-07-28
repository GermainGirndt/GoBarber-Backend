import Appointment from '../entities/Appointment';
// import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getRepository, Repository } from 'typeorm';

// typeorm 'Repository' has already some built in methods like:
// contructor, "all", "list" and "create"

class AppointmentsRespository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        console.log('find by date is being executed');

        // '||' behaves like an 'else'
        return findAppointment;
    }

    // defined typescript type with ': Appointment'
    // public create(provider: string, date: Date): Appointment {
    //     const appointment = new Appointment(provider, date);

    //     this.appointments.push(appointment);

    //     console.log('New appointment saved');
    //     console.log(this.appointments);

    //     return appointment;
    // }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRespository;
