"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleInRelationshipsTemplate = exports.getAttractivenessResultTemplate = exports.getPersonalitiesTemplate = exports.getToxicalRelTemplate = exports.getTraumaticTemplate = void 0;
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
const getRoleInRelationshipsTemplate = (roleInfo) => `
  <h3>${roleInfo.title}</h3>
  <h4>${roleInfo.subtitle}</h4>
  <p><strong>Тип ролі:</strong> ${roleInfo.type}</p>
  <p><strong>Опис:</strong> ${roleInfo.description}</p>
  <p><strong>Що робити далі?</strong> ${roleInfo.cta}</p>
`;
exports.getRoleInRelationshipsTemplate = getRoleInRelationshipsTemplate;
const getPersonalitiesTemplate = (typeInformation) => `
  <div class="personality-info-container">
    <div class="info-card">
      <div class="card-header">
        <h2>${typeInformation.type}</h2>
        <p class="deviz">💡 ${typeInformation.deviz}</p>
        <p class="koronna-fraza">✨ "${typeInformation.koronnaFraza}"</p>
      </div>

      <div class="card-content">
        ${typeInformation.tvoyaSyla.length > 0
    ? `
          <div class="info-section">
            <h3>Твоя Сила</h3>
            <ul>
              ${typeInformation.tvoyaSyla
        .map((strength) => `<li>✅ ${strength}</li>`)
        .join('')}
            </ul>
          </div>
        `
    : ''}

        ${typeInformation.tvoyaTayemnytsya.length > 0
    ? `
          <div class="info-section">
            <h3>Твоя Таємниця</h3>
            <ul>
              ${typeInformation.tvoyaTayemnytsya
        .map((secret) => `<li>🔒 ${secret}</li>`)
        .join('')}
            </ul>
          </div>
        `
    : ''}

        ${typeInformation.shchoBudeYakshchoNeZminyuvaty
    ? `
          <div class="info-section">
            <h3>Що буде, якщо не змінювати?</h3>
            <p>${typeInformation.shchoBudeYakshchoNeZminyuvaty}</p>
          </div>
        `
    : ''}

        ${typeInformation.yakUseZminytsyaKolyZrozumishSebe
    ? `
          <div class="info-section">
            <h3>Що зміниться, коли зрозумієш себе?</h3>
            <p>${typeInformation.yakUseZminytsyaKolyZrozumishSebe}</p>
          </div>
        `
    : ''}

        ${typeInformation.temnyyBlyznyuk.osoblyvosti.length > 0
    ? `
          <div class="info-section">
            <h3>Темний Близнюк: ${typeInformation.temnyyBlyznyuk.nazva}</h3>
            <ul>
              ${typeInformation.temnyyBlyznyuk.osoblyvosti
        .map((feature) => `<li>⚡ ${feature}</li>`)
        .join('')}
            </ul>
          </div>
        `
    : ''}

        ${typeInformation.legendarnyyMoment
    ? `
          <div class="info-section">
            <h3>Легендарний Момент</h3>
            <p>${typeInformation.legendarnyyMoment}</p>
          </div>
        `
    : ''}

        ${typeInformation.offer.benefits.length > 0
    ? `
          <div class="info-section">
            <h3>Прогрів на запис</h3>
            <ul>
              ${typeInformation.offer.benefits
        .map((item) => `<li>🔥 ${item}</li>`)
        .join('')}
            </ul>
          </div>
        `
    : ''}
      </div>

      <div class="card-footer">
        <p>Виявляється, що в кожного є свої суперсили та слабкості! Це твоя унікальна історія, і ти її створюєш! 🚀</p>
      </div>
    </div>
  </div>
`;
exports.getPersonalitiesTemplate = getPersonalitiesTemplate;
const getToxicalRelTemplate = (result) => `
  <h3>Результати тесту:</h3>
  <p><strong></strong> ${result.description}</p>
  
  <h4>${result.category}</h4>
  
  <h4>Рекомендації:</h4>
  <ul>
    ${result.recommendations
    .map((rec) => `<li>✅ ${rec}</li>`)
    .join('')}
  </ul>
  
  <h4>Головне:</h4>
  <p>${result.conclusion}</p>
  
  <h4>Consultation:</h4>
  <p>${result.consultation.text}</p>
  
 >
`;
exports.getToxicalRelTemplate = getToxicalRelTemplate;
const getAttractivenessResultTemplate = (result) => `
  <h3>Результати тесту привабливості:</h3>
  
  <h4>Категорія: ${result.category}</h4>
  
  <p><strong>Опис:</strong> ${result.description}</p>
  
  <h4>Відомі риси:</h4>
  <ul>
    ${result.knownTraits
    .map((trait) => `<li>✅ ${trait}</li>`)
    .join('')}
  </ul>
  
  <h4>Приховані риси:</h4>
  <ul>
    ${result.hiddenTraits
    .map((trait) => `<li>✅ ${trait}</li>`)
    .join('')}
  </ul>

  <h4>Чинники посилення привабливості:</h4>
  <ul>
    ${result.strengthBoosters
    .map((booster) => `<li>✅ ${booster}</li>`)
    .join('')}
  </ul>
  
  <h4>Ключова сила:</h4>
  <p>${result.keyPower}</p>
  
  <h4>Наступний крок:</h4>
  <p>${result.nextStep}</p>
  
  <h4>Заклик до дії:</h4>
  <p>${result.callToAction}</p>
`;
exports.getAttractivenessResultTemplate = getAttractivenessResultTemplate;
