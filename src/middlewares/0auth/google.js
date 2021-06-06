/* eslint-disable consistent-return */
import { pick } from 'lodash';
import AuthTokenHelper from '../../helpers/AuthTokenHelper';
import userService from '../../services/userService';
import usersController from '../../controllers/usersController';
import Util from '../../helpers/utils';

const util = new Util();
const googleAuth = async (req, res) => {
  const message = 'manually';
  const { emails } = req.user;
  const currentUser = await userService.findByEmail(emails[0].value);
  if (currentUser !== null) {
    if (currentUser.password !== null) {
      return res.redirect(`${process.env.FRONT_END_URL}/socialAuth/failure/${message}`);
    }
    const displayData = pick(currentUser.dataValues, ['id', 'firstName', 'lastName', 'email', 'RoleId', 'socialId', 'provider']);
    const authToken = AuthTokenHelper.generateToken(displayData);
    userService.updateAtt({ authToken }, { email: displayData.email });
    const encodedToken = Buffer.from(authToken).toString('base64');
    return res.redirect(`${process.env.FRONT_END_URL}/socialAuth/success/${encodedToken}`);
  }
  if (currentUser === null) {
    return usersController.socialSignup(req.user, res);
  }
};

export default googleAuth;
