export function toDate(value: any): Date {
    if (value && typeof value === "object" && value.toDate) {
        return value.toDate();
    }
    if (
        value &&
        typeof value === "object" &&
        value._seconds !== undefined &&
        value._nanoseconds !== undefined
    ) {
        return new Date(
            parseInt(
                value._seconds +
                    "" +
                    ("000" + value._nanoseconds).slice(-3).substr(0, 3)
            )
        );
    }
    if (
        value &&
        typeof value === "object" &&
        value.seconds !== undefined &&
        value.nanoseconds !== undefined
    ) {
        return new Date(
            parseInt(
                value.seconds +
                    "" +
                    ("000" + value.nanoseconds).slice(-3).substr(0, 3)
            )
        );
    }
    if (value instanceof Date) {
        return value;
    }
    if (value && typeof value === "string") {
        if (value.match(/^\d{2}\/\d{2}\/\d+$/)) {
            const [day, month, yearAndTime] = value.split("/");
            value = `${month}/${day}/${yearAndTime}`;
        }

        if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = value.split("-");
            value = `${month}/${day}/${year}`;
        }

        return new Date(value);
    }
    
    throw new Error(`Unable to convert ${value} to date instance.`);
}

export function validateDate(date: any): date is Date {
    date = toDate(date);
    return date instanceof Date && !isNaN(date.getTime());
}

export function sumTime(
    date: Date, 
    amount: number, 
    time: "year" | "month" | "days" | "hours" | "minutes" | "seconds"
): Date {
    const newDate = new Date(date.getTime());

    if (time === "seconds") {
        newDate.setSeconds(newDate.getSeconds() + amount);
    } else if (time === "minutes") {
        newDate.setMinutes(newDate.getMinutes() + amount);
    } else if (time === "hours") {
        newDate.setHours(newDate.getHours() + amount);
    } else if (time === "days") {
        newDate.setDate(newDate.getDate() + amount);
    } else if (time === "year") {
        newDate.setFullYear(newDate.getFullYear() + amount);
    }

    return newDate;
}