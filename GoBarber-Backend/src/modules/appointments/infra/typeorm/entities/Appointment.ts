// import { uuid } from 'uuidv4';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
// Class with typescript type - interface
// Actually, it was built to be related to the db
// enabling decorations in typescript config file and using it to relate it to the db
// remember to tset strictproperty as false, as the folowing field become the value from type orm

/**
 *
 * 1 -> 1
 * 1 -> M
 * M -> M
 * M -> 1
 *
 * Here: Many Appointments for one User
 *
 *
 */

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    // Typeorm comes with a built in a built in constructor
    // so that we don't need it anymore
    // constructor(provider: string, date: Date) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    //}
}

export default Appointment;
