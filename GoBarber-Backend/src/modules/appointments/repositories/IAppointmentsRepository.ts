import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;

    findByDate(date: Date): Promise<Appointment | undefined>;

    findAllInMonthFromProvider(
        date: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
}
