// src/lib/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Property {
  _id: string;
  title: string;
  image: string;
  slug: string;
  location: 'Colombo' | 'Kandy' | 'Galle';
  description: string;
  price: number;
  type: 'Single Family' | 'Villa';
  status: 'For Sale' | 'For Rent';
  area: number;
}

export const propertyApi = createApi({
  reducerPath: 'propertyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query<Property[], void>({
      query: () => '/properties',
      providesTags: ['Property'],
    }),
    getByLocation: builder.query<Property[], string>({
      query: (location) => `/properties/location/${location}`,
      providesTags: ['Property'],
    }),
    createProperty: builder.mutation<Property, Partial<Property>>({
      query: (body) => ({
        url: '/properties',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Property'],
    }),
    deleteProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Property'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetByLocationQuery,
  useCreatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;