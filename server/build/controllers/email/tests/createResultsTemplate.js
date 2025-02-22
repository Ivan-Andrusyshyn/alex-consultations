"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalitiesTemplate = exports.getTraumaticTemplate = void 0;
const getTraumaticTemplate = (typeInformation) => `
        <h3>Your Test Results:</h3>
        <p><strong>Description:</strong> ${typeInformation.description}</p>
        <h4>${typeInformation.insights.title}</h4>
        <ul>${typeInformation.insights.text
    .map((t) => `<li>💡 ${t}</li>`)
    .join('')}</ul>
        <h4>${typeInformation.strengths.title}</h4>
        <ul>${typeInformation.strengths.list
    .map((s) => `<li>✅ ${s}</li>`)
    .join('')}</ul>
        <h4>${typeInformation.challenges.title}</h4>
        <ul>${typeInformation.challenges.list
    .map((c) => `<li>🔴 ${c}</li>`)
    .join('')}</ul>
        <h4>${typeInformation.recommendations.title}</h4>
        <ul>${typeInformation.recommendations.list
    .map((r) => `<li>📌 ${r}</li>`)
    .join('')}</ul>
        <p>⏳ <strong>${typeInformation.retakeConditions.title}:</strong></p>
        <ul>${typeInformation.retakeConditions.list
    .map((c) => `<li>${c}</li>`)
    .join('')}</ul>
        <h4>📜 ${typeInformation.summary.title}</h4>
        <p>${typeInformation.summary.text}</p>
      `;
exports.getTraumaticTemplate = getTraumaticTemplate;
const getPersonalitiesTemplate = (typeInformation) => `
  <div class="personality-info-container">
    <div class="info-card">
      <div class="card-header">
        <h2>
          ${typeInformation.type}
        </h2>
        <p class="subtitle">${typeInformation.description}</p>
      </div>

      <div class="card-content">
        <div class="info-section">
          <h3>Сильні сторони</h3>
          <ul>
            ${typeInformation.strengths
    .map((strength) => `<li>✅ ${strength}</li>`)
    .join('')}
          </ul>
        </div>

        <div class="info-section">
          <h3>Слабкі сторони</h3>
          <ul>
            ${typeInformation.weaknesses
    .map((weakness) => `<li>🔴 ${weakness}</li>`)
    .join('')}
          </ul>
        </div>

        <div class="info-section">
          <h3>Сприйняття</h3>
          <div class="perception-group">
            <div class="perception-types">
              <h4>Інтуїція:</h4>
              <ul>
                ${typeInformation.perception.intuition
    .map((item) => `<li>📌 ${item}</li>`)
    .join('')}
              </ul>
            </div>
            <div class="perception-types">
              <h4>Почуття:</h4>
              <ul>
                ${typeInformation.perception.feelings
    .map((item) => `<li>📌 ${item}</li>`)
    .join('')}
              </ul>
            </div>
            <div class="perception-types">
              <h4>Спонтанність:</h4>
              <ul>
                ${typeInformation.perception.spontaneity
    .map((item) => `<li>📌 ${item}</li>`)
    .join('')}
              </ul>
            </div>
            <div class="perception-types">
              <h4>Логіка:</h4>
              <ul>
                ${typeInformation.perception.logic
    .map((item) => `<li>📌 ${item}</li>`)
    .join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Взаємовідносини</h3>
          <ul>
            ${typeInformation.relationships.traits
    .map((trait) => `<li>💞 ${trait}</li>`)
    .join('')}
          </ul>
        </div>

        <div class="info-section">
          <h3>Кар'єра</h3>
          <div class="career-group">
            <div>
              <h4>Уподобання:</h4>
              <ul>
                ${typeInformation.career.preferences
    .map((preference) => `<li>📌 ${preference}</li>`)
    .join('')}
              </ul>
            </div>
            <div>
              <h4>Найкращі сфери:</h4>
              <ul>
                ${typeInformation.career.bestFields
    .map((field) => `<li>🚀 ${field}</li>`)
    .join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <p>${typeInformation.conclusion}</p>
      </div>
    </div>
  </div>
`;
exports.getPersonalitiesTemplate = getPersonalitiesTemplate;
exports.default = getTraumaticTemplate;
