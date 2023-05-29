

import request from '@/utils/request'   // request => axios

export const loginAPI = params => request.post('/login.php', params).then(res => res.data)