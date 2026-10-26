import { getExaminationLibraryIndexViewModel } from './applications-examination-library-index.view-model.js';
import {
	categoryCodes,
	DEFAULT_SECTION_STATUS,
	examinationLibrarySections,
	placeHolderDynamicSections
} from './examination-library.constants.js';
import { getExaminationLibraryCategories } from './applications-examination-library.service.js';
import { formatCategoryStatus, getCategoryCode } from './applications-examination-library-utils.js';

/**
 * Get Examination Library index page
 *
 * @param {{ params: { caseId: string } }} request
 * @param {*} response
 */
export async function getExaminationLibraryIndex(request, response) {
	const { caseId } = request.params;
	const caseIdNumber = Number(caseId);

	const categories = await getExaminationLibraryCategories(caseIdNumber).catch(() => []);

	const sectionStatuses = examinationLibrarySections
		.filter((section) => Boolean(getCategoryCode(section, categoryCodes)))
		.map((section) => {
			const categoryCode = getCategoryCode(section, categoryCodes);
			const matchingCategory = categories.find((c) => c.categoryCode === categoryCode);

			return {
				slug: section.slug,
				status: matchingCategory
					? formatCategoryStatus(matchingCategory.publishedStatus)
					: DEFAULT_SECTION_STATUS
			};
		});

	const indexViewModel = getExaminationLibraryIndexViewModel({
		caseId: caseIdNumber,
		dynamicSections: placeHolderDynamicSections,
		sectionStatuses
	});

	return response.render(
		`applications/case-examination-library/examination-library-index.njk`,
		indexViewModel
	);
}
