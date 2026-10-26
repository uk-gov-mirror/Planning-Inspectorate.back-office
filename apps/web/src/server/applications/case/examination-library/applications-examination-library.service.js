import { get, post } from '../../../lib/request.js';

/**
 * @typedef {import('@pins/applications/lib/status-utils.js').ApplicationStatus} ApplicationStatus
 */

/**
 * Get examination library categories for a case
 *
 * @param {string | number} caseId
 * @param {{ categoryCode?: string }} [filters]
 * @returns {Promise<Array<{ id: number, caseId: number, categoryCode: string, categoryName: string, publishedStatus: string, examinationTimetableItemId?: number | null }>>}
 */
export async function getExaminationLibraryCategories(caseId, filters = {}) {
	const query = filters.categoryCode ? `?categoryCode=${filters.categoryCode}` : '';
	return get(`applications/${caseId}/examination-library${query}`);
}

/**
 * Get examination library section statuses for a case
 *
 * @param {number} caseId
 * @returns {Promise<Array<{slug: string, status: ApplicationStatus}>>}
 */
export async function getExaminationLibrarySectionStatuses(caseId) {
	return get(`applications/${caseId}/examination-library/section-statuses`);
}

/**
 * Get documents for a given case and examination library category code
 *
 * @param { string} caseId
 * @param {string} categoryCode
 * @param {string} queryString
 * @returns {Promise<any>}
 */
export async function getExaminationLibraryDocumentsByCategory(caseId, categoryCode, queryString) {
	return get(
		`applications/${caseId}/examination-library/documents?categoryCode=${categoryCode}&${queryString}`
	);
}

/**
 * Publishes documents for an examination library category.
 *
 * @param {string | number} caseId
 * @param {{ categoryCode: string }} payload
 * @returns {Promise<any>}
 */
export async function publishExaminationLibraryCategory(caseId, payload) {
	return post(`applications/${caseId}/examination-library/publish`, { json: payload });
}
