// import { isEqual } from 'date-fns';

import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
// typeorm 'Repository' has already some built in methods like:
// contructor, "all", "list" and "create"

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.date === date,
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        // the same as adding properties to the class instance
        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
