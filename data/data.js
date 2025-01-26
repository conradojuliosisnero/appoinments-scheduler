const crypto = require("crypto");

export const usuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    telefono: "555-1234",
    direccion: "Calle Falsa 123, Ciudad, País",
    fechaNacimiento: "1990-01-01",
    genero: "Masculino",
    ocupacion: "Ingeniero",
    estadoCivil: "Soltero",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  },
  {
    id: 2,
    nombre: "María López",
    email: "maria.lopez@example.com",
    telefono: "555-5678",
    direccion: "Avenida Siempre Viva 742, Ciudad, País",
    fechaNacimiento: "1985-05-15",
    genero: "Femenino",
    ocupacion: "Doctora",
    estadoCivil: "Casada",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 3,
    nombre: "Carlos García",
    email: "carlos.garcia@example.com",
    telefono: "555-8765",
    direccion: "Boulevard de los Sueños Rotos 456, Ciudad, País",
    fechaNacimiento: "1978-09-23",
    genero: "Masculino",
    ocupacion: "Abogado",
    estadoCivil: "Divorciado",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    email: "ana.martinez@example.com",
    telefono: "555-4321",
    direccion: "Plaza Mayor 789, Ciudad, País",
    fechaNacimiento: "1992-12-12",
    genero: "Femenino",
    ocupacion: "Diseñadora",
    estadoCivil: "Soltera",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 5,
    nombre: "Luis Fernández",
    email: "luis.fernandez@example.com",
    telefono: "555-6789",
    direccion: "Calle del Olvido 321, Ciudad, País",
    fechaNacimiento: "1980-03-30",
    genero: "Masculino",
    ocupacion: "Profesor",
    estadoCivil: "Casado",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 6,
    nombre: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    telefono: "555-9876",
    direccion: "Calle de la Amargura 654, Ciudad, País",
    fechaNacimiento: "1995-07-07",
    genero: "Femenino",
    ocupacion: "Arquitecta",
    estadoCivil: "Soltera",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 7,
    nombre: "Pedro Gómez",
    email: "pedro.gomez@example.com",
    telefono: "555-5432",
    direccion: "Avenida de la Paz 321, Ciudad, País",
    fechaNacimiento: "1982-11-11",
    genero: "Masculino",
    ocupacion: "Contador",
    estadoCivil: "Casado",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 8,
    nombre: "Sofía Ramírez",
    email: "sofia.ramirez@example.com",
    telefono: "555-6543",
    direccion: "Calle de la Esperanza 987, Ciudad, País",
    fechaNacimiento: "1998-02-02",
    genero: "Femenino",
    ocupacion: "Enfermera",
    estadoCivil: "Soltera",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 9,
    nombre: "Miguel Torres",
    email: "miguel.torres@example.com",
    telefono: "555-7654",
    direccion: "Boulevard de los Sueños 123, Ciudad, País",
    fechaNacimiento: "1975-08-08",
    genero: "Masculino",
    ocupacion: "Chef",
    estadoCivil: "Divorciado",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
  {
    id: 10,
    nombre: "Elena Ruiz",
    email: "elena.ruiz@example.com",
    telefono: "555-8765",
    direccion: "Plaza de la Libertad 456, Ciudad, País",
    fechaNacimiento: "1987-03-03",
    genero: "Femenino",
    ocupacion: "Periodista",
    estadoCivil: "Casada",
    password: "password123",
    token: crypto.randomBytes(16).toString("hex"),
  },
];

export const citas = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    appointments: [
      {
        id: 1,
        title: "Annual Checkup",
        description: "Routine medical examination",
        startDate: "2025-05-01T10:00:00",
        endDate: "2025-05-01T11:00:00",
        status: "Confirmed",
      },
      {
        id: 2,
        title: "Dentist Appointment",
        description: "Teeth cleaning and check-up",
        startDate: "2025-06-15T14:30:00",
        endDate: "2025-06-15T15:30:00",
        status: "Pending",
      },
      {
        id: 3,
        title: "Eye Exam",
        description: "Regular vision test",
        startDate: "2025-07-20T09:00:00",
        endDate: "2025-07-20T10:00:00",
        status: "Confirmed",
      },
      {
        id: 4,
        title: "Gynecology Appointment",
        description: "Annual ",
        startDate: "2025-01-10T16:00:00",
        endDate: "2025-01-10T17:00:00",
        status: "Confirmed",
      },
      {
        id: 5,
        title: "Dermatology Consultation",
        description: "Skin condition evaluation",
        startDate: "2025-01-25T11:15:00",
        endDate: "2025-01-25T12:15:00",
        status: "Pending",
      },
      {
        id: 6,
        title: "Nutritionist Appointment",
        description: "Discuss dietary plan",
        startDate: "2025-01-30T15:00:00",
        endDate: "2025-01-30T16:00:00",
        status: "Confirmed",
      },
      {
        id: 7,
        title: "Annual Checkup",
        description: "Routine medical examination",
        startDate: "2025-02-01T10:00:00",
        endDate: "2025-02-01T11:00:00",
        status: "Confirmed",
      },
      {
        id: 8,
        title: "Dentist Appointment",
        description: "Teeth cleaning and check-up",
        startDate: "2025-02-15T14:30:00",
        endDate: "2025-02-15T15:30:00",
        status: "Pending",
      },
      {
        id: 9,
        title: "Eye Exam",
        description: "Regular vision test",
        startDate: "2025-02-20T09:00:00",
        endDate: "2025-02-20T10:00:00",
        status: "Confirmed",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "securepass456",
    appointments: [
      {
        id: 4,
        title: "Gynecology Appointment",
        description: "Annual women's health check-up",
        startDate: "2025-05-10T16:00:00",
        endDate: "2025-05-10T17:00:00",
        status: "Confirmed",
      },
      {
        id: 5,
        title: "Dermatology Consultation",
        description: "Skin condition evaluation",
        startDate: "2023-06-25T11:15:00",
        endDate: "2023-06-25T12:15:00",
        status: "Pending",
      },
      {
        id: 6,
        title: "Nutritionist Appointment",
        description: "Discuss dietary plan",
        startDate: "2023-07-30T15:00:00",
        endDate: "2023-07-30T16:00:00",
        status: "In Progress",
      },
    ],
  },
];
