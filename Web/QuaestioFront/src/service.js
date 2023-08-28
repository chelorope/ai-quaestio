import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionaireAPI = createApi({
  reducerPath: "questionaireAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050/" }),
  endpoints: (builder) => ({
    loadQuestionaire: builder.mutation({
      query: (file) => ({
        url: `open-questionaire`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { loadQuestionaire } = questionaireAPI;
