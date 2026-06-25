import React, { useRef, useState, useEffect } from 'react';

const INTRO = "By submitting an idea to the PMRG Solution Ideathon, I confirm that I have read, understood, and agreed to the following terms and conditions.";

const TERMS = [
  {
    title: "1. Originality and Rights",
    text: "I confirm that my submitted idea and supporting document are my original work and do not infringe any copyright, trademark, patent, trade secret, design right, confidentiality obligation, employment restriction, institutional policy, client agreement, or any third-party proprietary right.\n\nI further confirm that I have all necessary rights, permissions, approvals, and authority to submit the idea and related document."
  },
  {
    title: "2. No Confidential or Restricted Information",
    text: "I confirm that my submission does not contain any confidential, trade-secret, proprietary, restricted, or legally protected information belonging to any employer, client, institution, organization, individual, or third party.\n\nPMRG Solution shall not be responsible for any claim arising from unauthorized, confidential, copied, or third-party content submitted by the participant."
  },
  {
    title: "3. Submission Limit",
    text: "Each participant may submit a maximum of three (3) ideas under one account.\n\nPMRG Solution reserves the right to reject, remove, or disqualify any submission that exceeds the permitted limit or violates the Ideathon rules."
  },
  {
    title: "4. Supporting Document",
    text: "Each idea may include a maximum of one (1) supporting document, such as a pitch deck, business canvas, concept note, prototype document, or similar material.\n\nThe document must be relevant to the idea and must not contain unlawful, offensive, confidential, copied, or third-party proprietary content."
  },
  {
    title: "5. Delete-to-Replace Workflow",
    text: "Supporting documents follow a “delete-to-replace” workflow.\n\nIf the participant wishes to upload a revised document while the idea is still in “Submitted” status, the existing file must first be deleted before uploading the new file."
  },
  {
    title: "6. Submission Freeze",
    text: "Once the idea status changes from “Submitted” to any further stage, including “Under Review,” “Shortlisted,” “Selected,” “Rejected,” or any other evaluation stage, the idea and its attachment shall be frozen.\n\nAfter such status change, the participant will not be able to edit, update, replace, or delete the submission unless specifically permitted by PMRG Solution in writing."
  },
  {
    title: "7. Evaluation and Selection",
    text: "Submission of an idea does not guarantee approval, shortlisting, selection, mentoring, funding, incubation, MVP development, commercial engagement, employment, equity, revenue share, profit share, or Co-Founder opportunity.\n\nAll submissions shall be evaluated based on criteria decided by PMRG Solution, including innovation, feasibility, business potential, market relevance, technical viability, scalability, impact, execution capability, and alignment with PMRG Solution's strategic direction.\n\nThe decision of PMRG Solution regarding evaluation, shortlisting, selection, rejection, awards, collaboration, or disqualification shall be final and binding."
  },
  {
    title: "8. Co-Founder or Strategic Association Opportunity",
    text: "PMRG Solution may, at its sole discretion, consider offering a Co-Founder position, strategic association, advisory role, employment opportunity, partnership opportunity, equity-based participation, revenue-sharing arrangement, or any other commercial association to a winner or selected participant.\n\nSuch opportunity shall not be automatic and shall be subject to business alignment, capability assessment, background verification, legal due diligence, compliance checks, internal approval, mutual discussion, and execution of a separate written agreement.\n\nParticipation, shortlisting, winning, mentoring, incubation, or MVP development shall not create any automatic right to employment, partnership, LLP membership, designated partner status, equity ownership, directorship, compensation, advisory fee, revenue share, profit share, royalty, or any other legal, financial, or commercial entitlement.\n\nAny Co-Founder position or similar association shall become valid only after execution of a formal written agreement and completion of all applicable legal, contractual, regulatory, and statutory requirements."
  },
  {
    title: "9. Intellectual Property and MVP Ownership",
    text: "The participant acknowledges that an idea, concept, business problem, theme, method, or approach may not by itself create exclusive ownership rights unless protected under applicable law or covered by a separate written agreement.\n\nIf PMRG Solution selects an idea for further evaluation, mentoring, prototyping, MVP development, productization, commercialization, or market launch, all intellectual property, software, source code, architecture, workflows, designs, user interfaces, documentation, business logic implementation, product framework, branding, enhancements, derivative works, technical assets, commercial models, and related materials developed by PMRG Solution shall belong exclusively to PMRG Solution, unless otherwise agreed in a separate written agreement.\n\nThe original idea credit may be given to the actual idea owner or contributor in a manner mutually agreed between the participant and PMRG Solution. Such credit shall not automatically create any ownership, equity, revenue share, profit share, royalty, employment, or commercial entitlement.\n\nAny pre-existing intellectual property independently owned by the participant before submission shall continue to remain with the participant, provided it is clearly disclosed and does not conflict with PMRG Solution's development, productization, or commercialization rights.\n\nWhere the participant contributes code, design, content, dataset, model, prototype, algorithm, workflow, or any other material for MVP or product development, its ownership, licensing, assignment, usage rights, confidentiality, commercial rights, and consideration, if any, shall be governed through a separate written agreement."
  },
  {
    title: "10. Similar or Related Ideas",
    text: "PMRG Solution may already be working on similar or related concepts, products, services, technologies, business models, or innovation areas.\n\nSubmission of an idea shall not restrict PMRG Solution from independently developing, improving, investing in, acquiring, partnering on, or commercializing similar or related solutions."
  },
  {
    title: "11. Participant Responsibility and Indemnity",
    text: "The participant shall be solely responsible for the accuracy, legality, originality, completeness, and authenticity of the submission.\n\nThe participant agrees to be responsible for any claim, dispute, loss, liability, damage, cost, or expense arising from breach of these terms, infringement of third-party rights, or submission of unauthorized or confidential content.\n\nPMRG Solution reserves the right to reject, remove, suspend, or disqualify any submission found to be copied, misleading, unlawful, offensive, confidential, infringing, incomplete, or in violation of these terms."
  },
  {
    title: "12. Communication and Additional Information",
    text: "PMRG Solution may contact the participant for clarification, presentation, evaluation, mentoring, discussion, documentation, or further development of the submitted idea.\n\nFailure to respond within the required timeline may result in the submission being moved forward, placed on hold, or rejected at the discretion of PMRG Solution."
  },
  {
    title: "13. Personal Data and Public Recognition",
    text: "By participating in the Ideathon, the participant agrees that PMRG Solution may collect and use the participant's name, contact details, profile information, photograph, organization or institution details, idea title, brief idea summary, submission documents, and related participation information for registration, evaluation, communication, shortlisting, mentoring, event administration, winner announcement, legal documentation, and program-related communication.\n\nPMRG Solution may use the participant's name, photograph, idea title, brief description, testimonial, and participation details for reasonable promotional, social media, website, event, announcement, and recognition purposes, subject to applicable law and professional usage.\n\nDetailed confidential business discussions, if any, shall be governed by a separate written agreement."
  },
  {
    title: "14. Minor Participant / Student Consent",
    text: "If a participant is below the legally applicable age of majority, participation shall be allowed only with valid consent from a parent or legal guardian.\n\nPMRG Solution may request guardian consent, additional confirmation, or supporting documentation before accepting, shortlisting, awarding, mentoring, or entering into any further agreement with such participant."
  },
  {
    title: "15. No Guarantee of Commercial Outcome",
    text: "Even if an idea is shortlisted, selected, mentored, or developed further, PMRG Solution does not guarantee product launch, funding, investment, market adoption, revenue generation, employment, partnership, equity, revenue share, profit share, or commercial success.\n\nAny future business engagement shall be subject to mutual discussion and separate legal documentation."
  },
  {
    title: "16. Governing Law and Jurisdiction",
    text: "These terms shall be governed by the laws of India.\n\nAny dispute arising from participation in the Ideathon shall be subject to the jurisdiction of the competent courts at Pune, Maharashtra, unless otherwise required under applicable law."
  },
  {
    title: "17. Acceptance Declaration",
    text: "By clicking “I Agree” and submitting my idea, I confirm that:\n\nI have read, understood, and accepted these Terms & Conditions.\nMy submission is original and lawfully submitted.\nI have all necessary rights and permissions to submit the idea.\nMy submission does not infringe any third-party rights.\nNo confidential, trade-secret, proprietary, or restricted information has been submitted.\nI understand the submission limit, document upload rule, delete-to-replace workflow, and submission freeze rule.\nI understand that submission does not guarantee approval, funding, selection, MVP development, employment, commercial engagement, or Co-Founder opportunity.\nI understand that any Co-Founder or commercial association shall be subject to legal due diligence and a separate written agreement.\nI understand that the MVP/product and PMRG-created intellectual property shall belong to PMRG Solution, while original idea credit may be given to the actual idea owner as mutually agreed.\nI agree to comply with the Ideathon rules, evaluation criteria, and final decisions of PMRG Solution.\n\nI hereby accept the above Terms & Conditions and Participant Declaration."
  },
];

export default function TermsAndConditions({ acceptedTerms, setAcceptedTerms }) {
  const scrollRef = useRef(null);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    if (reachedBottom) setHasScrolledToEnd(true);
  };

  useEffect(() => {
    // In case content is short enough to not need scrolling at all
    const el = scrollRef.current;
    if (el && el.scrollHeight <= el.clientHeight) setHasScrolledToEnd(true);
  }, []);

  return (
    <div className="bg-[#0E1424] max-w-6xl mx-auto border border-[#1F2A44] rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40 flex flex-col">
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Terms & Conditions</h2>
        {!hasScrolledToEnd && (
          <span className="text-xs font-medium text-cyan-400 flex items-center gap-1.5 animate-pulse">
            Scroll to read all
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="19 12 12 19 5 12" />
              <line x1="12" y1="5" x2="12" y2="19" />
            </svg>
          </span>
        )}
      </div> */}

      <p className="text-sm text-slate-400 mb-5 leading-relaxed">{INTRO}</p>

      {/* Internally scrollable terms box — fixed height so the page itself doesn't need to scroll */}
      <style>{`
        .terms-scroll::-webkit-scrollbar { display: none; }
        .terms-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="terms-scroll space-y-5 text-slate-400 text-sm overflow-y-auto"
        style={{ maxHeight: '320px' }}
      >
        {TERMS.map((item, i) => (
          <div key={i}>
            <p className="text-slate-200 font-semibold mb-1">{item.title}</p>
            {item.text.split('\n\n').map((para, j) => (
              <p key={j} className="leading-relaxed whitespace-pre-line mb-1.5 last:mb-0">{para}</p>
            ))}
          </div>
        ))}
        <div className="h-1" />
      </div>

      {/* Fade hint at the bottom of the scroll box while unread content remains */}
      <div className="relative">
        {!hasScrolledToEnd && (
          <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-[#0E1424] to-transparent" />
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-[#1F2A44]">
        <label
          className={`flex items-center gap-3 group ${
            hasScrolledToEnd ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={acceptedTerms}
              disabled={!hasScrolledToEnd}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="peer w-5 h-5 appearance-none rounded border border-[#24304A] bg-[#0B1020] checked:bg-cyan-500 checked:border-cyan-500 transition-all disabled:cursor-not-allowed cursor-pointer"
            />
            <svg
              className="absolute left-0.5 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            I agree to all Terms & Conditions and rules
          </span>
        </label>
        {!hasScrolledToEnd && (
          <p className="text-xs text-slate-500 mt-2 ml-8">
            Please scroll through all the terms above before agreeing.
          </p>
        )}
      </div>
    </div>
  );
}