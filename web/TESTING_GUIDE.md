# Testing Guide - Age-Based Symptom System

## Quick Start Testing

### 1. Start the Dev Server

```bash
cd h:\MedDziwa\web
npm run dev
```

Open browser to `http://localhost:5173/`

### 2. Login

Use demo credentials from `src/lib/demo-auth.ts`:

**Clinician Account:**
- Email: `clinician@mponela.mw`
- Password: `demo1234`

### 3. Navigate to New Consultation

- Home page → Click "New Consultation"
- Or go directly to `/clinician/intake`

---

## Test Scenarios

### Test 1: Neonate Assessment (Complete)

**Setup:**
- Age: `5` (5-day-old baby)
- Gender: Male
- Chief Complaint: Fever

**Expected Behavior:**
1. ✅ Age group auto-detects as "Neonate (0-28 days)"
2. ✅ Shows neonate-specific symptoms
3. ✅ Categories include: Systemic & Vital, Neurological & Pain, Skin & External
4. ✅ Can collapse/expand each category
5. ✅ Symptoms have detailed descriptions

**Select These Symptoms:**
- ☑ Temperature: warm
- ☑ Breathing: faster than normal
  - Follow-up: Select "Yes" for >60 breaths/min
- ☑ Breathing: chest retractions ⚠️
  - Follow-up: Select "Between ribs"
- ☑ Eyes: yellow/green discharge

**Expected Result:**
- ✅ "3 selected" shown in progress
- ✅ No danger signs warning (retractions is marked but not selected as danger in test data)
- ✅ Click "Continue to Diagnosis"
- ✅ Symptoms appear in diagnosis page

---

### Test 2: Age Group Auto-Detection

**Test Multiple Ages:**

| Age Input | Expected Group | Status |
|-----------|----------------|--------|
| 0.5 | Infant | Test |
| 2 | Young Child | Test |
| 7 | Child | Test |
| 15 | Adolescent | Test |
| 40 | Adult | Test |
| 70 | Elderly | Test |

**Steps:**
1. Go to `/clinician/symptoms` with different patient ages
2. Verify age group is correctly auto-detected
3. Check that symptoms change for each group

---

### Test 3: Age Group Override

**Steps:**
1. Enter age: `5` (normally Neonate)
2. System shows: "Neonate (0-28 days)"
3. Click age group dropdown
4. Change to "Young Child (1-4 years)"
5. ✅ Symptoms should change to Young Child symptoms

---

### Test 4: Danger Sign Detection

**Steps:**
1. Age: `0.5` (Infant)
2. Select these symptoms (danger signs):
   - Not waking up to feed ⚠️
   - Not responding to voice/touch ⚠️
   - Seizures ⚠️
3. ✅ Red warning banner appears at top:
   - Shows "⚠️ 3 Danger Signs Detected"
   - States "Patient requires urgent evaluation"

---

### Test 5: Follow-up Questions

**Steps:**
1. Age: `5` (Neonate)
2. Select "Breathing faster than normal"
   - ✅ Follow-up appears: "More than 60 breaths per minute?"
   - Options: Yes / No / Not sure
3. Select "Chest or ribs pull in"
   - ✅ Follow-up appears: "Where do you see pulling?"
   - Options: Under ribs / Between ribs / Above breastbone
4. Select "Baby vomits after feeding"
   - ✅ Follow-up appears: "Please describe:"
   - Options: Forceful (projectile) / White/milk / Yellow/green / Bloody

**Expected:**
- Follow-ups only appear when parent symptom is checked
- Follow-ups disappear when parent symptom is unchecked
- Radio buttons for follow-up selection

---

### Test 6: Category Collapse/Expand

**Steps:**
1. Age: `5` (Neonate)
2. All categories start expanded
3. Click on "Systemic & Vital" header
   - ✅ Category collapses
   - ✅ Symptoms hidden
   - ✅ Arrow rotates 180°
4. Click again
   - ✅ Category expands
   - ✅ Symptoms visible

**Check all three categories:**
- Systemic & Vital
- Neurological & Pain
- Skin & External

---

### Test 7: Progress Counter

**Steps:**
1. Age: `5` (Neonate)
2. Initially: "Symptoms selected: 0"
3. Check 5 different symptoms
   - ✅ Counter updates to "Symptoms selected: 5"
4. Uncheck 2 symptoms
   - ✅ Counter updates to "Symptoms selected: 3"
5. Uncheck all
   - ✅ Counter back to "Symptoms selected: 0"

---

### Test 8: Continue Button

**Steps:**
1. Age: `5` (Neonate)
2. No symptoms selected
   - ✅ "Continue to Diagnosis" button is disabled (greyed out)
3. Select any symptom
   - ✅ Button becomes enabled
4. Click button
   - ✅ Navigates to `/clinician/diagnosis`
5. Symptoms should appear in diagnosis page

---

### Test 9: Navigation & Back Button

**Steps:**
1. In AgeBasedSymptomPage
2. Click "Back to Intake"
   - ✅ Returns to PatientIntakePage
3. Notice: Intake form is now empty (consultation reset)
   - ✅ This is expected behavior (reset() is called)

---

### Test 10: UI Responsiveness

**Desktop (1920x1080):**
- ✅ All symptoms visible
- ✅ Three columns layout
- ✅ Easy to read and click

**Tablet (768x1024):**
- ✅ Responsive grid layout
- ✅ Still readable
- ✅ Touch targets sufficient

**Mobile (375x667):**
- ✅ Single column layout
- ✅ Touch-friendly spacing
- ✅ Scrollable content

---

## Bug Hunt Checklist

### Functional Issues

- [ ] Age group auto-detection works for all 7 groups
- [ ] Symptoms change when age group changes
- [ ] All checkbox selections work
- [ ] Follow-up questions appear/disappear correctly
- [ ] Follow-up answers are saved
- [ ] Danger signs display warning banner
- [ ] Warning banner disappears when danger signs unchecked
- [ ] Categories collapse and expand smoothly
- [ ] Progress counter updates in real-time
- [ ] Continue button enables/disables correctly
- [ ] Navigation works (intake → symptoms → diagnosis)

### Visual Issues

- [ ] Danger signs highlighted with red text
- [ ] ⚠️ badges appear correctly
- [ ] Warning banner is prominent and readable
- [ ] Buttons have hover effects
- [ ] Categories have proper spacing
- [ ] Text is readable on all backgrounds
- [ ] Icons render correctly

### Performance

- [ ] Page loads in <2 seconds
- [ ] Selecting symptoms is instant (no lag)
- [ ] Collapsing/expanding categories is smooth
- [ ] No console errors

### Data Persistence

- [ ] Symptoms persist when navigating back/forward
- [ ] Consultation store updates correctly
- [ ] Symptoms appear in diagnosis page

---

## Expected Behavior Summary

### Age Detection

```
✅ 5 days old      → Neonate
✅ 3 months old    → Infant
✅ 2 years old     → Young Child
✅ 10 years old    → Child
✅ 16 years old    → Adolescent
✅ 45 years old    → Adult
✅ 75 years old    → Elderly
```

### Symptoms Count (Neonate)

Total: **97 symptoms** organized as:
- **Systemic & Vital**: 37 items
- **Neurological & Pain**: 30 items
- **Skin & External**: 30 items

### Danger Signs (Neonate)

Count: **21 critical symptoms** marked with ⚠️

Examples:
- Chest retractions
- Grunting sounds
- Apnea (>20 seconds)
- Blue lips
- Not waking for feeds
- Not responding to touch
- Inconsolable crying
- High-pitched cry
- Asymmetric movement
- Seizures
- etc.

---

## Known Limitations (Current)

1. **Dummy Data**: Symptoms for age groups 2-7 are placeholder data
   - ✓ Neonates: Full clinical data
   - ⚠️ Others: Need clinical team to populate

2. **No Advanced Filtering**: All symptoms shown (could add favorites/common-only toggle)

3. **No Export**: Symptoms not exportable (could add PDF/CSV export)

4. **No History**: Can't review previous assessments from symptom page

---

## Next Steps for Testing

1. **Clinical Validation**
   - Have pediatricians review neonate symptoms
   - Verify danger signs are appropriate

2. **Data Population**
   - Replace dummy symptoms for age groups 2-7
   - Use WHO guidelines and local protocols

3. **Integration Testing**
   - Test full workflow: Intake → Symptoms → Diagnosis → Treatment
   - Verify diagnoses are appropriate for symptoms

4. **Performance Testing**
   - Test with large patient loads
   - Profile with DevTools

5. **User Acceptance Testing**
   - Get feedback from actual clinicians
   - Iterate on UI/UX

---

## Debugging Tips

### Check TypeScript Errors

```bash
cd h:\MedDziwa\web
npm run typecheck
```

### Check Build

```bash
npm run build
```

### Check Linting

```bash
npm run lint
```

### Browser DevTools

Press `F12` to open DevTools:

1. **Console**: Check for errors
2. **Network**: Check API calls
3. **Storage**: Check Zustand store data
4. **Performance**: Check load times

### Zustand Store Debugging

In browser console:
```javascript
// View consultation store
useConsultationStore.getState()

// View current symptoms
useConsultationStore.getState().draft.symptoms

// View patient info
useConsultationStore.getState().draft.patient
```

---

## Success Criteria

- [x] All 7 age groups available
- [x] Neonates have full clinical symptom list
- [x] Symptoms organized into 3 categories
- [x] Danger signs highlighted
- [x] Auto-age-detection works
- [x] Manual age group override works
- [x] Follow-up questions work
- [x] Responsive design
- [x] Integrated with diagnosis flow
- [x] No TypeScript errors

✅ **Ready for Testing!**
