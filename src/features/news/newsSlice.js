import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const cache = {};

const generateCacheKey = (params) => JSON.stringify(params);

const newsApiKey = import.meta.env.VITE_APP_NEWS_API_KEY
const proxyServerUrl = import.meta.env.VITE_APP_PROXY_SERVER_URL

export const fetchNews = createAsyncThunk('news/fetchNews', async (params) => {

  const cacheKey = generateCacheKey(params);

  if (cache[cacheKey]) {
    console.log('Returning cached response');
    return cache[cacheKey];
  }

  const response = await axios.get(`${proxyServerUrl}/api/v1/news?`, {
    params: {
      'access_key': newsApiKey,
      // 'countries': 'in',
      'languages': 'en',
      ...params,
    },
  });

  cache[cacheKey] = response.data;

  // console.log(response)
  return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    pagination: null,
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.pagination = action.payload.pagination;
        state.articles = action.payload.data;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;