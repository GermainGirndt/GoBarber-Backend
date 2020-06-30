import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import { getCustomRepository } from 'typeorm';

import { startOfHour } from 'date-fns';

import AppError from '../errors/AppError';

/**
 *
 * [x] Information reception
 * [/] Errors/Exceptions
 * [x] Repository access
 */

interface Request {
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
    // private appointmentsRepository: AppointmentsRepository;

    // constructor(appointmentsRepository: AppointmentsRepository) {
    //     this.appointmentsRepository = appointmentsRepository;
    // }

    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        // startOfHour brings the Data object back to the hour beguin
        const appointmentDate = startOfHour(date);
        console.log('here');
        console.log(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        console.log(findAppointmentInSameDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
export default CreateAppointmentService;
