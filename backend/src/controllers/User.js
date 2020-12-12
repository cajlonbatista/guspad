const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const mailer = require('../mails/mails');

const User = mongoose.model("User");

function generateToken(params = {}) {
  return (token = jwt.sign(params, process.env.AUTH, {
    expiresIn: 864000,
  }));
}

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async verify(req, res) {
    try {
      const { email } = req.body;

      const user = await User.find({ email });
      if (user.length === 0) {
        return res.status(200).json({ ok: true});
      } else {
        return res.status(200).json({ ok: false });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async show(req, res) {
    try {
      const users = User.find();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async create(req, res) {
    try {
      const { email, password, username } = req.body;
      
      const very = await User.find({ email });
      if (very.length !== 0) {
        return res.status(401).json({ message: 'User already exist'});
      }
      const user = await User.create({
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        username: username
      });
      
      user.password = undefined;

      return res
        .status(201)
        .json({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },

  async sicron(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).send({ error: 'User not found' });
      } else if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Invalid password' });
      }
      user.password = undefined;

      res.status(200).json({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async mailin(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user.length == 0) {
        return res.status(400).send({ error: 'User not found' });
      } else if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid password' });
      }

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })
      mailer.sendMail({
        to: email,
        from: 'cajlonbatista@acad.ifma.edu.br',
        template: 'forgot',
        context: { token }
      }, err => {
          if (err) {
            return res.status(400).json(err);
          }
          return res.status(200).json({ message: 'Sucess' });
      });
    } catch (error) {
      return res.status(400).json(err);
    }
  },
  async passchange(req, res) {
    try {
      const { email, token, password } = req.body;

      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');
      const now = new Date();
      if (user.length == 0) {
        return res.status(400).send({ error: 'User not found' });
      }else if (token !== user.passwordResetToken){
        return res.status(400).json({ error: 'Token invalid' });
      }else if (now > user.passwordResetExpires) {
        return res.status(400).json({ error: 'Token expired, generate a new one' });
      }
      user.password = password;
      await (await user).save();
      res.send();
    } catch (error) {
      
    }  
  }
};
