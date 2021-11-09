import { configureStore } from '@reduxjs/toolkit';
import admin from './features/adminSlice';
import comic from './features/comicSlice';

export default configureStore({
	reducer: { admin: admin.default, comic: comic.default },
});
