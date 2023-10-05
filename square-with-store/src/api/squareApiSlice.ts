import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Square } from '../features/square/square'

// Define a service using a base URL and expected endpoints
export const squareApi = createApi({
    reducerPath: 'squareApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/squares' }),
    endpoints: (builder) => ({
      getSquareById: builder.query<Square, number>({
        query: (id) => `${id}`,
      }),
      getSquareAll: builder.query<Square[],void>({
        query: () => '',
        // providesTags: ['Square'],
      }),
      addNewSquare: builder.mutation<Square, Partial<Square>>({
        query: (payload: Partial<Square>) => ({
          url: '',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        // invalidatesTags: ['Square'],
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetSquareByIdQuery, useGetSquareAllQuery, useAddNewSquareMutation } = squareApi