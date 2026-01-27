import { Query } from "mongoose";

const queryBuilder = <T>(modelQuery: Query<T[], T>, query: Record<string, unknown>) => {
    const search = (searchableFields: string[]) => {
        const searchTerm = query.searchTerm as string | undefined;
        if (searchTerm) {
            modelQuery = modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" }
                }))
            });
        }
        return { ...queryMethods, modelQuery };
    };

    const filter = () => {
        const queryObj = { ...query };
        const excludeFields = ['page', 'sort', 'limit', 'searchTerm', 'fields']; 
        excludeFields.forEach((el) => delete queryObj[el]);
        modelQuery = modelQuery.find(queryObj);
        return { ...queryMethods, modelQuery };
    };

    const sort = () => {
        const sortField = (query.sort as string)?.split(',').join(' ') || '-createdAt';
        modelQuery = modelQuery.sort(sortField);
        return { ...queryMethods, modelQuery };
    };

    const paginate = () => {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        modelQuery = modelQuery.skip(skip).limit(limit);
        return { ...queryMethods, modelQuery };
    };

    const fields = () => {
        const selectedFields = (query.fields as string)?.split(',').join(' ') || '-__v';
        modelQuery = modelQuery.select(selectedFields);
        return { ...queryMethods, modelQuery };
    };

    const countTotal = async () => {
        const totalQuery = modelQuery.getFilter();
        const total = await modelQuery.model.countDocuments(totalQuery);
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const totalPages = Math.ceil(total / limit);
        return { total, page, limit, totalPages };
    };

    const queryMethods = { search, filter, sort, paginate, fields, countTotal };
    return { ...queryMethods, modelQuery };
};

export default queryBuilder;
