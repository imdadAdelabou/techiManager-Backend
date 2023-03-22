export const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type", "X-Requested-With"],
};

export const errorMessage = {
  visitorNotFound: "Vistor not found",
  attendanceCreated: "Attendance created",
  internaleServor: "Internal server error",
  badRequest: "Bad request",
};

export const visitorCollectionName = "visitors";
export const attendanceCollectionName = "attendances";
