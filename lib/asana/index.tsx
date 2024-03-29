import { insertTask } from "@/lib/mongodb";
import { updateTask } from "@/lib/mongodb";

const Asana = require("asana");

let client = Asana.ApiClient.instance;
let token = client.authentications["token"];
token.accessToken = process.env.ASANAKEY;

let taskData = {
  name: "Name fehlt!",
  assignee: "nicht zugewiesen",
  workspace: "Workplace",
  asanaGID: "",
  nummer: "Task123",
  project: "ProjectXYZ",
  status: "In Progress",
  termin: "2024-02-11",
};

export async function getAsanaTask(asanaGID) {
  return new Promise((resolve, reject) => {
    let tasksApiInstance = new Asana.TasksApi();
    let opts = {
      opt_fields:
        "assignee.name,custom_fields.enum_value,custom_fields.name,custom_fields.text_value,due_on,notes,name",
    };

    tasksApiInstance.getTask(asanaGID, opts).then(
      (result) => {
        console.log(
          "Asana API called successfully. Returned data: " +
            JSON.stringify(result.data, null, 2)
        );
        resolve(result); // Hier wird das Promise erfolgreich aufgelöst.
      },
      (error) => {
        console.error(error.response.body);
        reject(error); // Hier wird das Promise abgelehnt, wenn ein Fehler auftritt.
      }
    );
  });
}

export async function getAndInsertTask(asanaGID) {
  try {
    const response = await getAsanaTask(asanaGID);

    if (response.data.gid) {
      const status = response.data.custom_fields[0]?.enum_value?.name ?? "";
      const kunde = response.data.custom_fields[1]?.text_value ?? "";
      const nummer = response.data.custom_fields[2]?.text_value ?? "";
      const termin = response.data.due_on;
      const name = response.data.name ?? "";

      let taskData = {
        name: name,
        assignee: "fabian behrens",
        workspace: "1203216507389836",
        asanaGID: asanaGID,
        nummer: nummer,
        project: kunde,
        status: status,
        termin: termin,
      };

      console.log(taskData);
      await insertTask(taskData);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAndUpdateTask(asanaGID) {
  try {
    const response = await getAsanaTask(asanaGID);

    if (response.data.gid) {
      const status = response.data.custom_fields[0]?.enum_value?.name ?? "";
      const kunde = response.data.custom_fields[1]?.text_value ?? "";
      const nummer = response.data.custom_fields[2]?.text_value ?? "";
      const termin = response.data.due_on;
      const name = response.data.name ?? "";

      let taskData = {
        name: name,
        assignee: "fabian behrens",
        workspace: "Workplace",
        asanaGID: asanaGID,
        nummer: nummer,
        project: kunde,
        status: status,
        termin: termin,
      };
      await updateTask(taskData);
    }
  } catch (error) {
    console.error(error.response.body);
  }
}
