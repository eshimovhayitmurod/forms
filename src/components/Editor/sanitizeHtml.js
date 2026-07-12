import DOMPurify from 'dompurify';
const sanitizeHtml = (html = '') => {
   const cleanHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      KEEP_CONTENT: true,
      SANITIZE_DOM: true,
      ALLOWED_URI_REGEXP:
         /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-]|$))/i,
      FORBID_TAGS: ['script', 'style'],
      FORBID_ATTR: ['onerror', 'onclick'],
   });
   return cleanHTML;
};
export default sanitizeHtml;
