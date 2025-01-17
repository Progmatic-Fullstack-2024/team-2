import prisma from "../models/prisma-client.js";
import { createFiles, deleteFiles, updateFiles } from "./file.service.js";
import HttpError from "../utils/HttpError.js";

const getById = async (performanceId) => {
	const performance = await prisma.performance.findUnique({
		where: { id: performanceId },
	});
	if (!performance) throw new HttpError("Performance not found", 404);
	return performance;
};

const list = async () => {
	const performances = await prisma.performance.findMany();
	if (!performances) throw new HttpError("Performances not found", 404);
	return performances;
};

const create = async (performanceData, poster, images) => {
	try {
		const posterURL = await createFiles([poster]);
		const imageUrls = await createFiles(images);
		const newPerformance = await prisma.performance.create({
			data: {
				...performanceData,
				posterURL: posterURL[0],
				imagesURL: imageUrls,
			},
		});
		return newPerformance;
	} catch (error) {
		throw new HttpError(error.message || "Failed to create performance", error.status || 500);
	}
};

const update = async (performanceId, performanceData, poster, images) => {
	try {
		const performanceToUpdate = await getById(performanceId);
		const posterURL = await updateFiles([performanceToUpdate.posterURL], [poster]);
		const imageUrls = await updateFiles(performanceToUpdate.imagesURL, images);
		const updatedPerformance = await prisma.performance.update({
			where: { id: performanceId },
			data: {
				...performanceData,
				posterURL: posterURL[0],
				imagesURL: imageUrls,
			},
		});
		return updatedPerformance;
	} catch (error) {
		throw new HttpError(error.message || "Failed to update performance", error.status || 500);
	}
};

const destroy = async (performanceId) => {
	try {
		const performanceToDelete = await getById(performanceId);
		await deleteFiles([performanceToDelete.posterURL]);
		await deleteFiles(performanceToDelete.imagesURL);
		return prisma.performance.delete({ where: { id: performanceId } });
	} catch (error) {
		throw new HttpError(error.message || "Failed to delete performance", error.status || 500);
	}
};

export default { create, update, destroy, list, getById };
