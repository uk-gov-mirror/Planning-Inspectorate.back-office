import {
	getExaminationLibraryCategories,
	getExaminationLibraryDocumentsByCategory
} from './applications-examination-library.service.js';
import { getExaminationLibrarySectionViewModel } from './applications-examination-library-section.view-model.js';
import { categoryCodes, examinationLibrarySections } from './examination-library.constants.js';
import {
	formatCategoryStatus,
	getSectionByItemSlug,
	getCategoryCode,
	getExaminationLibraryPagination
} from './applications-examination-library-utils.js';
import { buildQueryString } from '../../common/components/build-query-string.js';
import { url } from '../../../lib/nunjucks-filters/index.js';

/**
 * @typedef {import('./applications-examination-library-utils.js').ExaminationLibraryDocumentVersion} ExaminationLibraryDocumentVersion
 */

/**
 * Get Examination Library section detail page.
 *
 * @param {import('express').Request<{ caseId: string, slug: string }>} request
 * @param {import('express').Response<any, { case: { title: string }, caseId?: number }>} response
 * @returns {Promise<void>}
 */
export async function getExaminationLibrarySection(request, response) {
	const { slug: itemSlug } = request.params;
	const { sortBy, pageSize = 25, page = 1 } = request.query;
	const caseId = response.locals?.caseId || Number(request.params?.caseId);
	const pageNumber = Number(page) || 1;
	const pageSizeNumber = Number(pageSize) || 25;

	const projectName = response.locals.case.title;

	const section = getSectionByItemSlug(examinationLibrarySections, itemSlug);

	if (!section) {
		return response.status(404).render('app/404');
	}

	const sectionCategoryCode = getCategoryCode(section, categoryCodes);

	const queryString = buildQueryString({
		sortBy,
		pageSize: pageSizeNumber,
		page: pageNumber
	});

	const [documentsResponse, categoriesResponse] = await Promise.all([
		sectionCategoryCode
			? getExaminationLibraryDocumentsByCategory(caseId, sectionCategoryCode, queryString)
			: Promise.resolve({
					page: pageNumber,
					pageSize: pageSizeNumber,
					pageCount: 1,
					itemCount: 0,
					items: []
				}),
		sectionCategoryCode
			? getExaminationLibraryCategories(caseId, { categoryCode: sectionCategoryCode }).catch(
					() => []
				)
			: Promise.resolve([])
	]);

	/** @type {ExaminationLibraryDocumentVersion[]} */
	const sectionDocuments = documentsResponse?.items ?? [];

	const matchingCategory = categoriesResponse?.find((c) => c.categoryCode === sectionCategoryCode);
	const dbCategoryStatus = matchingCategory?.publishedStatus;
	const isPublishedQuery = request.query.published === 'true';

	const sectionStatus = isPublishedQuery ? 'published' : formatCategoryStatus(dbCategoryStatus);

	const sectionUrl = url('examination-library-section', { caseId, slug: itemSlug });
	const publishUrl = url('examination-library-publish', { caseId, slug: itemSlug });

	const sectionViewModel = getExaminationLibrarySectionViewModel({
		sectionDocuments,
		sectionStatus,
		itemSlug,
		query: request.query,
		sectionUrl
	});

	if (!sectionViewModel) {
		return response.status(404).render('app/404');
	}

	return response.render('applications/case-examination-library/examination-library-section.njk', {
		...sectionViewModel,
		caseId,
		projectName,
		publishUrl,
		showSuccessBanner: isPublishedQuery,
		pagination: getExaminationLibraryPagination(request.query, documentsResponse, sectionUrl)
	});
}
