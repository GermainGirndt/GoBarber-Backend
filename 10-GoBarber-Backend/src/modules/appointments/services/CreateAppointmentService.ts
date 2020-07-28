import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 *
 * [x] Information reception
 * [/] Errors/Exceptions
 * [x] Repository access
 */

interface IRequest {
    provider_id: string;
    date: Date;
}

/**
 *
 * Dependency inversion (SOLID)
 *
 * if serves has an external dependency (eg. repositories)
 * We should not make another repository in the class.
 * Instead, we should receive the repository in the class and return it.
 *
 */

class CreateAppointmentService {
    // private in the construction creates the variable

    constructor(private appointmentsRepository: IAppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public async execute({
        date,
        provider_id,
    }: IRequest): Promise<Appointment> {
        // startOfHour brings the Data object back to the hour beguin
        const appointmentDate = startOfHour(date);
        console.log('here');
        console.log(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        console.log(findAppointmentInSameDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}
export default CreateAppointmentService;
