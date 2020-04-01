// ACTIONS LIVE HERE

import { login, signup } from './authActions';

import { getTurnips, postTurnip, deleteTurnip } from './turnipActions';

export default {
	login,
	signup,
	getTurnips,
	postTurnip,
	deleteTurnip
};