const taskServices = require('../src/services/service');
const taskController = require('../src/controllers/controller');

describe('Test Controller', () => {
    describe('Get all Tasks', () => {
        const mockResult = [{ id: 1, task: 'Task 1', isCompleted: false }];

        it('Should return all tasks', async () => {
            jest.spyOn(taskServices, 'getAllTasks').mockResolvedValue(mockResult);
            const mockReq = {};
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await taskController.getAllTasks(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
        it('Should return 404 error', async () => {
            jest.spyOn(taskServices, 'getAllTasks').mockResolvedValue(null);
            const mockReq = {
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.getAllTasks(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.json).toBeCalledWith({ message: 'No entries found' });
        });
        it('Should return 500 Error', async () => {
            jest.spyOn(taskServices, 'getAllTasks').mockRejectedValue(null);
            const mockReq = {
            }
            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.getAllTasks(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });
    describe('Get a Task', () => {
        const mockResult = { id: 1, task: 'Task 1', isCompleted: false };
        it('Should return a task', async () => {
            jest.spyOn(taskServices, 'getTask').mockResolvedValue(mockResult);
            const mockReq = {
                params: {
                    id: 1,
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.getTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
        it('Should return 404 error', async () => {
            jest.spyOn(taskServices, 'getTask').mockResolvedValue(null);
            const mockReq = {
                params: {
                    id: 2,
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.getTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.json).toBeCalledWith({ message: 'No entry found' });
        });
        it('Should return 500 Error', async () => {
            jest.spyOn(taskServices, 'getTask').mockRejectedValue(null);
            const mockReq = {
                params: {
                    id: 'string',
                }
            }
            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.getTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });

    describe('Post a Task', () => {
        const mockBody = { task: 'Task 1' };
        const mockResult = { id: 1, task: 'Task 1', isCompleted: false, createdAt: '2021-03-01T00:00:00.000Z', updatdAt: '2021-03-01T00:00:00.000Z' };
        it('Should return a task', async () => {
            jest.spyOn(taskServices, 'createTask').mockResolvedValue(mockResult);
            const mockReq = {
                body: mockBody
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.createTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(201);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
        it('Should return 500 Error', async () => {
            jest.spyOn(taskServices, 'createTask').mockRejectedValue(null);
            const mockReq = {
                body: mockBody
            }
            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.createTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });
    describe('Update a task using put', () => {
        const mockBody = { id: 1, task: 'Task 1', isCompleted: true, createdAt: '2021-03-01T00:00:00.000Z', updatedAt: '2021-03-01T00:00:00.000Z' };
        it('Should return updated or noewly created task', async () => {
            jest.spyOn(taskServices, 'updateTask').mockResolvedValue(mockBody);
            const mockReq = {
                params: {
                    id: 1
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            await taskController.updateTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockBody);
        });
        it('Should return 500 error', async () => {
            jest.spyOn(taskServices, 'createTask').mockRejectedValue(null);
            const mockReq = {
                body: mockBody
            }
            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.createTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });
    describe('Delete a Task', () => {
        const mockResult = { message: `Task with id 1 deleted.` };
        it('Should return a task', async () => {
            jest.spyOn(taskServices, 'deleteTask').mockResolvedValue(mockResult);
            const mockReq = {
                params: {
                    id: 1,
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.deleteTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
        it('Should return 404 error', async () => {
            jest.spyOn(taskServices, 'deleteTask').mockResolvedValue(0);
            const mockReq = {
                params: {
                    id: 2,
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.deleteTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.json).toBeCalledWith({ message: 'No entry deleted. Entry not found' });
        });
        it('Should return 500 Error', async () => {
            jest.spyOn(taskServices, 'deleteTask').mockRejectedValue(0);
            const mockReq = {
                params: {
                    id: 'string',
                }
            }
            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.deleteTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });
    describe('Complete a Task using Patch', () => {
        const mockBody = { isCompleted: true };
        const mockResult = { id: 1, task: 'Task 1', isCompleted: true, createdAt: '2021-03-01T00:00:00.000Z', updatdAt: '2021-03-01T00:00:00.000Z' };
        it('Should return a task', async () => {
            jest.spyOn(taskServices, 'completeTask').mockResolvedValue(mockResult);
            const mockReq = {
                body: mockBody,
                params: {
                    id: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.completeTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.json).toBeCalledWith(mockResult);
        });
        it('Should return 404 error', async () => {
            jest.spyOn(taskServices, 'completeTask').mockResolvedValue(0);
            const mockReq = {
                body: mockBody,
                params: {
                    id: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await taskController.completeTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.json).toBeCalledWith({ message: 'No entry updated. Entry not found' });
        });
        it('Should return 500 Error', async () => {
            jest.spyOn(taskServices, 'updateTask').mockRejectedValue(0);
            const mockReq = {
                body: mockBody,
                params: {
                    id: 1
                }
            }

            const mockjson = jest.fn();
            const mockRes = {
                status: jest.fn(() => ({
                    json: mockjson,
                }))
            }
            await taskController.updateTask(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockjson).toBeCalledWith({ message: 'Something went wrong' });
        });
    });
});



//     describe('Get Request for all tasks', () => {
//         const data = [
//             {
//                 "id": 2,
//                 "task": "task2",
//                 "isCompleted": false,
//                 "createdAt": "2023-02-01T21:08:27.693Z",
//                 "updatedAt": "2023-02-01T21:08:27.693Z"
//             },
//             {
//                 "id": 3,
//                 "task": "task3",
//                 "isCompleted": false,
//                 "createdAt": "2023-02-01T21:53:20.564Z",
//                 "updatedAt": "2023-02-01T21:53:20.564Z"
//             }
//         ];
//         it('Should return all entries for send and its status code', async () => {
//             jest.spyOn(taskService, 'getAllTasks').mockResolvedValue(data);
//             const mockreq = {
//             };
//             const mockres = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn()
//             };
//             await taskController.getAllTasks(mockreq, mockres);
//             expect(mockres.json).toBeCalledWith(data);
//             expect(mockres.status).toBeCalledWith(200);
//         });
//         it('Should return 404 error if no entries found', async () => {
//             jest.spyOn(taskService, 'getAllTasks').mockResolvedValue(null);
//             const mockreq = {
//             };
//             const mockres = {
//                 status: jest.fn().mockReturnThis(),
//                 json: jest.fn()
//             };
//             await taskController.getAllTasks(mockreq, mockres);
//             expect(mockres.status).toBeCalledWith(404);
//             expect(mockres.json).toBeCalledWith({ message: 'No entries found' });

//         });
//         // it('Should return error if no entries found', async () => {
//         //     jest.spyOn(taskService, 'getAllTasks').mockResolvedValue('string');
//         //     await taskController.getAllTasks(mockreq, mockres);
//         //     expect(mockres.json).toBeCalledWith({ message: 'Something went wrong' });
//         //     expect(mockres.status).toBeCalledWith(500);
//         // });
//     });

//     // describe('Get Request for specific id', () => {
//     //     const mockreq = {
//     //         params: { id: 1 }
//     //     };
//     //     const mockres = {
//     //         status: jest.fn().mockReturnThis(),
//     //         json: jest.fn()
//     //     };
//     //     it('Should return task entry for send', async () => {
//     //         jest.spyOn(taskService, 'getTask').mockResolvedValue({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: false,
//     //         });

//     //         await taskController.getTask(mockreq, mockres);
//     //         expect(mockres.json).toBeCalledWith({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: false,
//     //         });
//     //         expect(mockres.status).toBeCalledWith(200);
//     //     });
//     //     it('Should return error if no entry found', async () => {
//     //         jest.spyOn(taskService, 'getTask').mockResolvedValue(new Error("No entries exists"));
//     //         await taskController.getTask(mockreq, mockres);
//     //         expect(mockres.json).toBeCalledWith(new Error("No entries exists"));
//     //     });
//     // });
//     // describe('Put Request', () => {
//     //     const mockreq = {
//     //         params: {
//     //             id: 1
//     //         }
//     //     };
//     //     const mockres = {
//     //         status: jest.fn().mockReturnThis(),
//     //         json: jest.fn()
//     //     };
//     //     it('Should return updated entry or newly created entry incase it does not exist', async () => {
//     //         jest.spyOn(taskService, 'updateTask').mockResolvedValue({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: true,
//     //             createdAt: '12-03-23',
//     //             updatedAt: '12-03-23'
//     //         });
//     //         await taskController.updateTask(mockreq, mockres);
//     //         expect(mockres.json).toBeCalledWith({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: true,
//     //             createdAt: '12-03-23',
//     //             updatedAt: '12-03-23'
//     //         });
//     //     });
//     // });
//     // describe('Patch Request', () => {
//     //     const mockreq = {
//     //         params: {
//     //             id: 1
//     //         }
//     //     };
//     //     const mockres = {
//     //         status: jest.fn().mockReturnThis(),
//     //         json: jest.fn()
//     //     };
//     //     it('Should return newly updated entry', async () => {
//     //         jest.spyOn(taskService, 'completeTask').mockResolvedValue({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: true,
//     //             createdAt: '12-03-23',
//     //             updatedAt: '12-03-23'
//     //         });
//     //         await taskController.completeTask(mockreq, mockres);
//     //         expect(mockres.json).toBeCalledWith({
//     //             id: 1,
//     //             task: 'groceries',
//     //             isCompleted: true,
//     //             createdAt: '12-03-23',
//     //             updatedAt: '12-03-23'
//     //         });
//     //     });
//     // });
//     // describe('Delete Request', () => {
//     //     const mockreq = {
//     //         params: {
//     //             id: 1
//     //         }
//     //     };
//     //     const mockres = {
//     //         status: jest.fn().mockReturnThis(),
//     //         json: jest.fn()
//     //     };
//     //     it('Should return newly created entry', async () => {
//     //         jest.spyOn(taskService, 'deleteTask').mockResolvedValue({
//     //             message: 'Task with id 1 deleted.'
//     //         });
//     //         await taskController.deleteTask(mockreq, mockres);
//     //         expect(mockres.json).toBeCalledWith({
//     //             message: 'Task with id 1 deleted.'
//     //         });
//     //     });
//     // });
// });
