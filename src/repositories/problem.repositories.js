const logger = require('../config/logger.config');
const NotFound = require('../errors/notFound.error');
const { Problem } = require('../models');

class ProblemRepository {
    async createProblem(problemData) {
        try {
            const problem = await Problem.create({
                title: problemData.title,
                description: problemData.description,
                codeStubs: problemData.codeStubs,
                testCases: problemData.testCases? problemData.testCases: [],
                difficulty: "MEDIUM"
            });
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async getAllProblems () {
        try {
            const problems = await Problem.find({});
            return problems;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async getProblem(id) {
        try {
            const problem = await Problem.findById(id);
            if (!problem) {
                throw new NotFound("Problem", id);
            };
            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async deleteProblem(id) {
        try {
            
            const deletedProblem = await Problem.findByIdAndDelete(id);
            
            if (!deletedProblem) {
                logger.error(`Problem with id: ${id} not found in database`);
                throw new NotFound("problem", id);
            };
            return deletedProblem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async updateProblem(id) {
        try {
            const updatedProblem = await Problem.findByIdAndUpdate(id, updatedData, {new: true});
            if (!updatedProblem) {
                throw new NotFound("Problem", id);
            };
        return updatedProblem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

module.exports = ProblemRepository;