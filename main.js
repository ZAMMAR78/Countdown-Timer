import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
async function startTimer() {
    const res = await inquirer.prompt({
        name: "userInput",
        type: "number",
        message: "Please enter the number of seconds",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input > 60) {
                return "Seconds must be less than or equal to 60";
            }
            else {
                return true;
            }
        }
    });
    const input = res.userInput;
    const intervalTime = new Date(Date.now() + input * 1000); // Calculate end time
    setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer Has Expired");
            process.exit();
        }
        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTimer();
