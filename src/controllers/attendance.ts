import { Request, Response } from "express";
import {
  Attendance,
  UpdateAttendanceBody,
  validator,
  validatorUpdateAttendanceBody,
} from "../models/Attendance";
import { checkIfUserExist } from "../middlewares/checkIfUserExist";
import {
  attendanceCollectionName,
  errorMessage,
  visitorCollectionName,
} from "../helpers/constant";
import { FirebaseCstoreOrm } from "../middlewares/firebaseCstoreOrm";
const CloudFirestoreOrm = new FirebaseCstoreOrm();

export async function add(req: Request, res: Response) {
  try {
    console.log(Date.now());
    let { visitorId, startDate, endDate } = req.body;
    let attendance = new Attendance();

    attendance.visitorId = visitorId;
    attendance.startDate = startDate;
    attendance.endDate = endDate;
    let errors = await validator(attendance);

    if (errors.length > 0) {
      return res.status(400).json({ errors, msg: errorMessage.badRequest });
    }
    const user = await checkIfUserExist(visitorId, visitorCollectionName);
    if (typeof user === "boolean") {
      return res.status(404).json({ msg: errorMessage.visitorNotFound });
    }
    const resultStorage =
      await CloudFirestoreOrm.addDocToCollection<Attendance>(
        attendanceCollectionName,
        { ...attendance }
      );
    if (!resultStorage)
      return res.status(500).json({ msg: errorMessage.internaleServor });

    return res.status(201).json({ msg: errorMessage.attendanceCreated });
  } catch (e) {
    return res.status(500).json({ msg: errorMessage.internaleServor });
  }
}

export async function endAttendance(req: Request, res: Response) {
  try {
    const { docId, endDate } = req.body;
    const updateAttendanceBody = new UpdateAttendanceBody();

    updateAttendanceBody.docId = docId;
    updateAttendanceBody.endDate = endDate;
    const errors = await validatorUpdateAttendanceBody(updateAttendanceBody);
    if (errors.length > 0)
      return res.status(400).json({ msg: errorMessage.badRequest, errors });

    const resultUpdate = await CloudFirestoreOrm.updateDocOnCollection(
      attendanceCollectionName,
      { endDate },
      docId
    );
    if (!resultUpdate)
      return res.status(500).json({ msg: errorMessage.internaleServor });
    return res.status(200).json({ msg: "End of attendance" });
  } catch (e) {
    return res.status(500).json({ msg: errorMessage.internaleServor });
  }
}
