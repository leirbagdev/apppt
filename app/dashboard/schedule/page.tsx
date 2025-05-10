"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import { format, addDays, subDays, parseISO, isToday } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentTime] = useState(new Date())

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1))
  }

  const goToToday = () => {
    setSelectedDate(new Date())
  }

  // Locations/rooms for training
  const locations = [
    { id: "sala-a", name: "Sala A", hours: "06:00 - 22:00" },
    { id: "sala-b", name: "Sala B", hours: "06:00 - 22:00" },
    { id: "sala-c", name: "Sala C", hours: "08:00 - 20:00" },
    { id: "piscina", name: "Piscina", hours: "07:00 - 21:00" },
    { id: "quadra", name: "Quadra", hours: "08:00 - 22:00" },
  ]

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      client: "Mariano",
      location: "sala-a",
      startTime: "2025-04-13T08:00:00",
      endTime: "2025-04-13T09:00:00",
      trainer: "Ricardo",
      type: "Musculação",
    },
    {
      id: 2,
      client: "Flávio",
      location: "sala-b",
      startTime: "2025-04-13T10:30:00",
      endTime: "2025-04-13T11:30:00",
      trainer: "Carla",
      type: "Funcional",
    },
    {
      id: 3,
      client: "Leonardo",
      location: "piscina",
      startTime: "2025-04-13T14:00:00",
      endTime: "2025-04-13T15:00:00",
      trainer: "Marcos",
      type: "Natação",
    },
    {
      id: 4,
      client: "Ana",
      location: "sala-c",
      startTime: "2025-04-13T16:00:00",
      endTime: "2025-04-13T17:00:00",
      trainer: "Juliana",
      type: "Pilates",
    },
    {
      id: 5,
      client: "Carlos",
      location: "quadra",
      startTime: "2025-04-13T18:00:00",
      endTime: "2025-04-13T19:00:00",
      trainer: "Ricardo",
      type: "Tênis",
    },
    {
      id: 6,
      client: "Mariana",
      location: "sala-a",
      startTime: "2025-04-13T17:00:00",
      endTime: "2025-04-13T18:00:00",
      trainer: "Carla",
      type: "Yoga",
    },
  ]

  // Helper function to position appointments
  const getAppointmentStyle = (startTime, endTime) => {
    const start = parseISO(startTime)
    const end = parseISO(endTime)

    // Calculate position based on 24-hour day (each hour is 60px height)
    const dayStart = new Date(start)
    dayStart.setHours(6, 0, 0, 0) // Day starts at 6:00

    const startMinutes = (start.getHours() - dayStart.getHours()) * 60 + start.getMinutes()
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60)

    return {
      top: `${startMinutes}px`,
      height: `${durationMinutes}px`,
    }
  }

  // Helper function to get current time position
  const getCurrentTimePosition = () => {
    const dayStart = new Date()
    dayStart.setHours(6, 0, 0, 0) // Day starts at 6:00

    const currentMinutes = (currentTime.getHours() - 6) * 60 + currentTime.getMinutes()
    return {
      top: `${currentMinutes}px`,
    }
  }

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = parseISO(appointment.startTime)
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agendamento</h2>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            onClick={goToToday}
          >
            Hoje
          </button>
          <button
            className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            onClick={goToPreviousDay}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            onClick={goToNextDay}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-zinc-800 p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{format(selectedDate, "d 'de' MMMM, yyyy", { locale: ptBR })}</h2>
          <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            <PlusIcon className="h-4 w-4" />
            Novo Agendamento
          </button>
        </div>

        <div className="relative overflow-x-auto">
          <div className="flex">
            {/* Time column */}
            <div className="sticky left-0 z-10 w-24 bg-zinc-800 pr-2">
              <div className="h-12"></div> {/* Empty space for header alignment */}
              <div className="space-y-[60px] pt-2 text-right text-xs text-zinc-400">
                {Array.from({ length: 17 }).map((_, i) => (
                  <div key={i} className="relative h-0">
                    {`${i + 6}:00`}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule grid */}
            <div className="relative flex-1 overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Location headers */}
                <div className="flex h-12 border-b border-zinc-700">
                  {locations.map((location) => (
                    <div key={location.id} className="flex-1 border-l border-zinc-700 px-2 py-1">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-zinc-400">{location.hours}</div>
                    </div>
                  ))}
                </div>

                {/* Schedule grid */}
                <div className="relative flex h-[1020px]">
                  {" "}
                  {/* 17 hours * 60px */}
                  {locations.map((location) => (
                    <div key={location.id} className="relative flex-1 border-l border-zinc-700">
                      {/* Hour grid lines */}
                      {Array.from({ length: 17 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute left-0 right-0 border-t border-zinc-700/50"
                          style={{ top: `${i * 60}px` }}
                        ></div>
                      ))}

                      {/* Appointments for this location */}
                      {filteredAppointments
                        .filter((appointment) => appointment.location === location.id)
                        .map((appointment) => {
                          const style = getAppointmentStyle(appointment.startTime, appointment.endTime)
                          return (
                            <div
                              key={appointment.id}
                              className="absolute left-1 right-1 rounded-md bg-emerald-500/10 p-2 text-xs hover:bg-emerald-500/20"
                              style={style}
                            >
                              <div className="font-medium text-emerald-500">{appointment.client}</div>
                              <div className="text-zinc-300">{appointment.type}</div>
                              <div className="text-zinc-400">
                                {format(parseISO(appointment.startTime), "HH:mm")} -
                                {format(parseISO(appointment.endTime), "HH:mm")}
                              </div>
                              <div className="text-zinc-400">Treinador: {appointment.trainer}</div>
                            </div>
                          )
                        })}

                      {/* Add appointment button */}
                      <button className="absolute right-1 top-1 rounded-full bg-zinc-700/50 p-1 text-zinc-400 hover:bg-zinc-700 hover:text-white">
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {/* Current time indicator (only show for today) */}
                  {isToday(selectedDate) && (
                    <div
                      className="absolute left-0 right-0 z-10 border-t-2 border-red-500"
                      style={getCurrentTimePosition()}
                    >
                      <div className="absolute -left-1 -top-2 h-4 w-4 rounded-full bg-red-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Próximos Agendamentos</h2>
          <div className="space-y-4">
            {filteredAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center gap-4 rounded-lg bg-zinc-700/30 p-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">
                    {appointment.client} - {appointment.type}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {format(parseISO(appointment.startTime), "HH:mm")} -{format(parseISO(appointment.endTime), "HH:mm")}{" "}
                    • {locations.find((loc) => loc.id === appointment.location)?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Disponibilidade</h2>
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between rounded-lg bg-zinc-700/30 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-zinc-400">{location.hours}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                    {filteredAppointments.filter((a) => a.location === location.id).length} agendamentos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
