import axios from 'axios';
import * as types from '@/store/types';
import ProfileService from '@/services/ProfileService';
import TokenService from '@/services/core/TokenService';

export default {
  async fetch({ commit }) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/profile/user/${TokenService.getUserId()}`);
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },

  async fetchData({ commit }, id) {
    try {
      const { data: { data } } = await axios.get(`/t/auditions/profile/user/${id}`);
      commit(types.FETCH_PROFILE_SUCCESS, data);
    } catch (e) {
      commit(types.FETCH_PROFILE_FAILURE);
    }
  },
};
