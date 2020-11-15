import Appointment from '../entities/Appointment';
// import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getRepository, Repository, Raw } from 'typeorm';

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

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        // if month === 5 => 05
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        // if month === 5 => 05
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRespository;
