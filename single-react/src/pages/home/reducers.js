import { SALELIST } from "./actionTypes";

export default (preState={}, action) => {
    switch (action.type) {
        case SALELIST:
            return { ...preState };
        default:
            return preState
    }
};
