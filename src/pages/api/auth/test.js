import React from "react";
import { POST } from "../../../../utils/API";
import { ServerConfig } from "../../../../global/config";

const Test = async (req, res) => {
  try {
    const { method, body } = req;

    const { name, email } = body.data;

    if (method == "GET") {
      const res = {
        success: true,
        error: false,
        message: "Existing User",
        status: 200,
        data: {
          user: {
            _id: "6491479f52089f80e40264e0",
            name: "nikhil",
            email: "nikhil@bhiveworkspace.com",
            department: "Technology",
            role: 2,
            phone: "+1123-456-7890",
            profileImage: "profile.jpg",
            status: 1,
            isDeleted: false,
            createdAt: "2023-06-20T06:30:55.316Z",
            __v: 0,
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OTE0NzlmNTIwODlmODBlNDAyNjRlMCIsIm5hbWUiOiJuaWtoaWwiLCJlbWFpbCI6Im5pa2hpbEBiaGl2ZXdvcmtzcGFjZS5jb20iLCJkZXBhcnRtZW50IjoiVGVjaG5vbG9neSIsInJvbGUiOjIsInBob25lIjoiKzExMjMtNDU2LTc4OTAiLCJwcm9maWxlSW1hZ2UiOiJwcm9maWxlLmpwZyIsInN0YXR1cyI6MSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQwNjozMDo1NS4zMTZaIiwiX192IjowfSwiaWF0IjoxNjg4NTM0NjQ0fQ.AxcCZERfB0ORLUpjG4ymkwMJpTvcST2LgPM_lXbfmws",
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0OTE0NzlmNTIwODlmODBlNDAyNjRlMCIsIm5hbWUiOiJuaWtoaWwiLCJlbWFpbCI6Im5pa2hpbEBiaGl2ZXdvcmtzcGFjZS5jb20iLCJkZXBhcnRtZW50IjoiVGVjaG5vbG9neSIsInJvbGUiOjIsInBob25lIjoiKzExMjMtNDU2LTc4OTAiLCJwcm9maWxlSW1hZ2UiOiJwcm9maWxlLmpwZyIsInN0YXR1cyI6MSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMy0wNi0yMFQwNjozMDo1NS4zMTZaIiwiX192IjowfSwiaWF0IjoxNjg4NTM0NjQ0fQ.AxcCZERfB0ORLUpjG4ymkwMJpTvcST2LgPM_lXbfmws",
          },
        },
      };

      const data = "There is no matched record in the database";
      res.contentType("text/html");
      return res.send({ matched: data });

      // return res.status(200).json(res);
      // const { accessToken } = response.data.data.user;
      // const token = accessToken;
    } else {
      return "error";
    }
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};

export default Test;
