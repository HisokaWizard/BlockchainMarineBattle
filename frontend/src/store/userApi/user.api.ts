import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "user/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: any }, meta, arg) => {
        console.log(response.data, meta, arg);
        return response.data;
      },
      invalidatesTags: ["User"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        console.log(arg, extra, queryFulfilled, requestId);
      },
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {
        console.log(arg, extra, requestId, cacheEntryRemoved, cacheDataLoaded);
      },
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
