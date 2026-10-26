/**
 * Application status constants
 * @readonly
 * @enum {string}
 */
export const APPLICATION_STATUS = Object.freeze({
	DRAFT: 'draft',
	IN_PROGRESS: 'in-progress',
	READY_TO_PUBLISH: 'ready-to-publish',
	PUBLISHED: 'published',
	READY_TO_UNPUBLISH: 'ready-to-unpublish',
	UNPUBLISHED: 'unpublished',
	ARCHIVED: 'archived'
});

/**
 * Application status types used across the applications system
 * @typedef {'draft' | 'in-progress' | 'ready-to-publish' | 'published' | 'ready-to-unpublish' | 'unpublished' | 'archived'} ApplicationStatus
 */

/**
 * Status tag classes mapping for UI display
 * @typedef {Object.<ApplicationStatus, string>} StatusTagClasses
 */

/**
 * Mapping of application statuses to their corresponding tag classes
 * @type {StatusTagClasses}
 */
export const STATUS_TAG_CLASSES = {
	[APPLICATION_STATUS.DRAFT]: 'govuk-tag--grey',
	[APPLICATION_STATUS.IN_PROGRESS]: 'govuk-tag--blue',
	[APPLICATION_STATUS.READY_TO_PUBLISH]: 'govuk-tag--blue',
	[APPLICATION_STATUS.PUBLISHED]: 'govuk-tag--green',
	[APPLICATION_STATUS.READY_TO_UNPUBLISH]: 'govuk-tag--yellow',
	[APPLICATION_STATUS.UNPUBLISHED]: 'govuk-tag--grey',
	[APPLICATION_STATUS.ARCHIVED]: 'govuk-tag--purple'
};

/**
 * Get the tag class for a given status
 * @param {ApplicationStatus} status - The application status
 * @returns {string} The corresponding tag class
 */
export const getStatusTagClass = (status) => {
	return STATUS_TAG_CLASSES[status] || 'govuk-tag--grey';
};

/**
 * Get the display name for a given status
 * @param {ApplicationStatus} status - The application status
 * @returns {string} The display name for the status
 */
export const getStatusDisplayName = (status) => {
	const displayNames = {
		[APPLICATION_STATUS.DRAFT]: 'Draft',
		[APPLICATION_STATUS.IN_PROGRESS]: 'In progress',
		[APPLICATION_STATUS.READY_TO_PUBLISH]: 'Ready to publish',
		[APPLICATION_STATUS.PUBLISHED]: 'Published',
		[APPLICATION_STATUS.READY_TO_UNPUBLISH]: 'Ready to unpublish',
		[APPLICATION_STATUS.UNPUBLISHED]: 'Unpublished',
		[APPLICATION_STATUS.ARCHIVED]: 'Archived'
	};
	return displayNames[status] || status;
};

/**
 * Get all application status values
 * @returns {ApplicationStatus[]} All application status values
 */
export const getAllApplicationStatuses = () => {
	// @ts-ignore
	return Object.keys(STATUS_TAG_CLASSES);
};
