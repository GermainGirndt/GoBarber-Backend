# Pages

# Password Recover

**Functional Requirements**

- The user should have to possibility to recover his password by entering the e-mail;
- The user should receive instructions for recovering his password;
- The user should reset his password

**Not Functional Requirements**

- For testing email sending in development environment use mailtrap;

- Use amazon SES for email send in production

- The e-mail send should happen in background


**Business Rules**

- The link send by e-mail to reset the user's password should expire in 2 hours
- The user should confirm the new password for reseting the password



# Profile Update

**Functional Requirements**

- The user should update his name, e-mail and password in a determined day

**Not Functional Requirements**

**Business Rules**

- The set email should not be used
- For updating the password, the user should inform the old one
- for update the password, the user should confirm the new password

# Service Provider Panel

**Functional Requirements**

- The user should be able to list his appointments in a specific day

- The service provider should receive a notification always when there's a new booking
-  The service provider should be able to see the not read notifications


**Not Functional Requirements**

- The bookings should be stored in chace
- The notifications should be stored in MongoDB
- The notifications should be send in real time with Socket.io

**Business Rules**

- The notifications should categorized under read / not read



# Service Booking

**Functional Requirements**

- The user should have the possibility to list all the service providers
- The user should have the possibility to list all days in a month which have at least one day available by service provider 
- The user should have the possibility to list all available times for a given day by provider
- The user should have the possibility to book a new appointment with a service provider

**Not Functional Requirements**

- The service providers list should be stored in cache

**Business Rules**
- Each appointment should take exactly one hour;
- The apppoinments should be available between 8.am and 5 pm. (first 8h; 17h)
- The user can't book in a already booked appointment
- The user can't book in a time in the past
- The user can't book services with himself