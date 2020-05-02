'use strict';
const mongoose = require('mongoose');
const NewsClipping = mongoose.model('NewsClipping');

exports.list_all_clippings_from_single_day = (req, res) => {
  // TODO: 1. THE CLINET NEEDS TO SEND THE DATE AS A STRING FROM MOMENT AS 'DD/MM/YYY'
  // get all
  const date = req.body.date;
  NewsClipping.find({ date: date }, (err, clippings) => {
    if (err) {
      return res.status(500).json({
        error: err,
        message: 'No clippings fround',
      });
    }
    return res.status(200).json({
      success: true,
      data: clippings,
    });
  });
};

exports.list_all_clippings_from_hour = (req, res) => {
  // get all
  const hour = req.params.hour;
  console.log(hour);
};

exports.read_single_clipping = (req, res) => {
  // get with param of id
  const clipping = req.params.clippingId;
  console.log(clipping);
};

// exports.list_all_tasks = (req, res) => {
//   middleware
//     .checkToken(req.params.token)
//     .then((promiseResponse) => {
//       if (promiseResponse.success) {
//         Task.find({}, (err, tasks) => {
//           if (err) {
//             return res.status(500).json({
//               error: err,
//               message: 'No tasks fround',
//               code: 204,
//             });
//           }
//           return res.status(200).json({
//             success: true,
//             data: tasks,
//           });
//         });
//       }
//     })
//     .catch((promiseError) => {
//       if (promiseError) {
//         return res.status(500).json({
//           success: false,
//           message: 'Bad Token',
//         });
//       }
//     });
// };

// exports.create_a_task = (req, res) => {
//   const newTask = new Task(req.body);
//   newTask.save((err, task) => {
//     if (err) {
//       res.send({
//         error: err,
//         message: "Couldn't create new task",
//         code: 400,
//       });
//     }
//     res.send({
//       message: 'Task created',
//       data: task,
//       code: 201,
//     });
//   });
// };

// exports.read_a_task = (req, res) => {
//   Task.findById(req.params.taskId, (err, task) => {
//     if (err) {
//       res.send({
//         error: err,
//         message: "Couldn't find task",
//         code: 400,
//       });
//     }
//     res.send({
//       message: 'Task found',
//       data: task,
//       code: 200,
//     });
//   });
// };

// exports.update_a_task = (req, res) => {
//   Task.findByIdAndUpdate(
//     { _id: req.params.taskId },
//     req.body,
//     { new: true },
//     (err, task) => {
//       if (err) {
//         res.send({
//           error: err,
//           message: "Couldn't update task",
//           code: 400,
//         });
//       }
//       res.send({
//         message: 'Task updated successfully',
//         data: task,
//         code: 200,
//       });
//     }
//   );
// };

// exports.delete_a_task = (req, res) => {
//   Task.remove(
//     {
//       _id: req.params.taskId,
//     },
//     (err, task) => {
//       if (err) {
//         res.send({
//           error: err,
//           message: "Couldn't delete task",
//           code: 400,
//         });
//       }
//       res.send({
//         message: 'Task deleted successfully',
//         data: task,
//         code: 200,
//       });
//     }
//   );
// };
