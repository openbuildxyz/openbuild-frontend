/*
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Button'
import { EditIcon, DeleteIcon, AddIcon } from '@/components/Icons'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
// import { useCourseDetails } from '#/services/learn/hooks'
import { Modal } from '@/components/Modal'
import { OEditor } from '@/components/MarkDown'
import { currentTime } from '@/utils/date'
import { Select } from '@/components/Select'

import  { BASE_INPUT_STYLE } from '@/constants/config'

const bodyTypeOptions = [
  {
    name: 'Video',
    key: 'video',
  },
  {
    name: 'Text',
    key: 'text',
  },
]
const defaultContentForm = bodyTypeOptions[0].key

function getContentFormLabel(type) {
  let label = '-'

  if (type) {
    const found = bodyTypeOptions.find(opt => opt.key === type)

    if (found) {
      label = found.name
    }
  }

  return label
}

export function CreatorLearnStepThree({ data, change }) {

  const [currentRenderNumber, setCurrentRenderNumber] = useState(0)
  const [addChapterModalOpen, setAddChapterModalOpen] = useState(false)

  const [forms, setForms] = useState()



  // useEffect(() => {
  //   if (data && !formStatus) {
  //     const _forms = Object.assign({ ...forms }, {})
  //     _forms.base = { ...data.base }

  //     // if (data.courses !== null && data.courses?.length > 0) {
  //       const coursesArr = data.courses?.map(i => {
  //         return { ...i.base, id: i.base.course_single_id }
  //       })
  //       _forms.courses = coursesArr
  //     // }
  //     setForms(_forms)
  //     setFormStatus(true)
  //   }
  // }, [params.id, data, params, forms, formStatus])

  const [chapterKeys, setChapterKeys] = useState([])
  const [addChapterNameValue, setAddChapterNameValue] = useState('')

  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false)

  const [currentChapterName, setCurrentChapterName] = useState('')
  const [addLessonSerialNumber, setAddLessonSerialNumber] = useState('')
  const [addLessonTitle, setAddLessonTitle] = useState('')
  const [addLessonTime, setAddLessonTime] = useState('')
  const [addLessonContentForm, setAddLessonContentForm] = useState(defaultContentForm)
  const [addLessonDetails, setAddLessonDetails] = useState('')
  const [confirmType, setConfirmType] = useState('add')
  const [currentEditCourse, setCurrentEditCourse] = useState()
  const [addOrEditChapter, setAddOrEditChapter] = useState('add')
  const [currentEditChapterName, setCurrentEditChapterName] = useState()

  useEffect(() => {
    if (data) {
      setForms({...data})
    }
  }, [data])

  useMemo(() => {
    if (forms?.courses) {
      const _csd = forms?.courses?.map(i => i.base.course_single_chapter) || []
      if (currentRenderNumber === 0) {
        setChapterKeys(Array.from(new Set(_csd)))
      }
    }
  }, [forms?.courses, currentRenderNumber])

  const addChapter = () => {
    if (chapterKeys.filter(f => f === addChapterNameValue).length > 0) {
      toast.error('Chapter already exists')
      return
    }
    if (addOrEditChapter === 'add') {
      const currentChapterKeys = [...chapterKeys]
      currentChapterKeys.push(addChapterNameValue)
      setChapterKeys(currentChapterKeys)
      setAddChapterModalOpen(false)
    } else {
      const currentChapterKeys = [...chapterKeys]
      const _edited = currentChapterKeys.map(i => {
        if (i === currentEditChapterName) {
          return addChapterNameValue
        } else {
          return i
        }
      })
      const _forms = Object.assign({ ...forms }, {})
      const _editedForms = _forms.courses.map(i => {
        if (i.base.course_single_chapter === currentEditChapterName) {
          const _edit = i
          _edit.base.course_single_chapter = addChapterNameValue
          return _edit
        } else {
          return i
        }
      })
      change('courses', _editedForms)
      // setForms(_forms)
      setAddChapterModalOpen(false)
      setChapterKeys(_edited)
    }
  }

  const addLesson = () => {
    let allCourses = forms?.courses ? [...forms.courses] : []
    const _course = {
      course_single_index: Number(addLessonSerialNumber),
      course_single_chapter: currentChapterName,
      course_single_name: addLessonTitle,
      course_single_estimated_time: Number(addLessonTime),
      course_single_type: addLessonContentForm,
      course_single_content: addLessonDetails,
    }
    if (confirmType === 'add') {
      allCourses.push({base: {..._course, course_single_id: currentTime()}})
    } else {
      const arrs = allCourses.map(i => {
        if (i.base.course_single_id === currentEditCourse.course_single_id) {
          return { base: {...i.base, ..._course}}
        } else {
          return { ...i }
        }
      })
      allCourses = arrs
    }
    change('courses', allCourses)
    setCurrentRenderNumber(1)
    setAddLessonModalOpen(false)
  }

  const eidtLesson = (course, chapterName) => {
    setCurrentEditCourse(course.base)
    setConfirmType('edit')
    setAddLessonModalOpen(true)
    setCurrentChapterName(chapterName)
    setAddLessonSerialNumber(course.base.course_single_index)
    setAddLessonTitle(course.base.course_single_name)
    setAddLessonTime(course.base.course_single_estimated_time)
    setAddLessonContentForm(course.base.course_single_type)
    setAddLessonDetails(course.base.course_single_content)
  }

  const deleteLesson = item => {
    const filtered = forms.courses.filter(f => f.base.course_single_id !== item.base.course_single_id)
    setCurrentRenderNumber(1)
    change('courses', filtered)
  }

  const deleteChapter = item => {
    const _forms = Object.assign({ ...forms }, {})
    const filtered = _forms.courses.filter(f => f.base.course_single_chapter !== item)
    setCurrentRenderNumber(1)
    change('courses', filtered)
  }

  const editChapter = item => {
    setAddChapterModalOpen(true)
    setAddChapterNameValue(item)
    setCurrentEditChapterName(item)
    setAddOrEditChapter('edit')
    setCurrentRenderNumber(1)
  }

  return (
    <>
      <div className="mt-9" id="creator-three">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-normal opacity-80">Chapters</h3>
          <div className="flex">
            <Button
              onClick={() => {
                setAddChapterModalOpen(true)
                setAddOrEditChapter('add')
                setAddChapterNameValue('')
              }}

              className="h-7 px-3 text-xs rounded-md"
            >
              <PlusIcon className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        {chapterKeys.map((i, k) => (
          <div key={`chapters-${k}`} className="mb-4 rounded text-sm">
            {/* px-4 pt-2 pb-1  */}
            <div className="flex items-center justify-between bg-gray rounded-t h-12 px-4 text-white">
              <h5 className="font-bold flex items-center">
                {i}
                <EditIcon onClick={() => editChapter(i)} className="ml-2 h-4 w-4 cursor-pointer [&>path]:stroke-white" />
              </h5>
              <div className="flex items-center">
                <DeleteIcon onClick={() => deleteChapter(i)} className="h-4 w-4 cursor-pointer [&>g>path]:stroke-white"/>
                <AddIcon
                  onClick={() => {
                    setConfirmType('add')
                    setAddLessonModalOpen(true)
                    setCurrentChapterName(i)
                    setAddLessonSerialNumber('')
                    setAddLessonTitle('')
                    setAddLessonTime('')
                    setAddLessonContentForm(defaultContentForm)
                    setAddLessonDetails('')
                  }}
                  className="ml-4 h-4 w-4 cursor-pointer [&>g>path]:stroke-white"
                />
              </div>
            </div>
            <div className="border border-[#D9D9D9] rounded-b px-4">
              <ul className="grid h-10 grid-cols-6 gap-5 leading-10 text-xs opacity-60">
                <li>No.</li>
                <li className="col-span-2">Title</li>
                <li className="text-right">Content form</li>
                <li className="text-right">Time to learn</li>
                <li className="text-right">Operate</li>
              </ul>
              {forms?.courses &&
                forms?.courses?.map(
                  (v, k) =>
                    v.base.course_single_chapter === i && (
                      <ul
                        key={`chapters-${i}-${k}`}
                        className="grid h-14 grid-cols-6 items-center gap-5 border-t border-gray-400 leading-8"
                      >
                        <li>{v.base?.course_single_index}</li>
                        <li className="col-span-2 font-bold">{v.base?.course_single_name}</li>
                        <li className="text-right">{getContentFormLabel(v.base?.course_single_type)}</li>
                        <li className="text-right">{Number(v.base?.course_single_estimated_time) / 60} mins</li>
                        <li className="flex items-center justify-end">
                          <DeleteIcon onClick={() => deleteLesson(v)} className="h-4 w-4 cursor-pointer text-sm" />
                          <EditIcon onClick={() => eidtLesson(v, i)} className="ml-4 h-4 w-4 cursor-pointer text-sm" />
                        </li>
                      </ul>
                    )
                )}
              {forms?.courses && forms?.courses.filter(f => f.base.course_single_chapter === i).length === 0 && (
                <div className="py-4 text-center text-sm opacity-60">No Contetnt</div>
              )}
            </div>
          </div>
        ))}

      </div>
      <Modal mode="base" isOpen={addChapterModalOpen} title={'Add Chapter'} closeModal={() => setAddChapterModalOpen(false)}>
        <div>
          <p className="text-sm text-gray-100 mb-2">Chapter Name</p>
          <input
            type="text"
            name="chapter_name"
            value={addChapterNameValue}
            onChange={e => setAddChapterNameValue(e.target.value)}
            className={BASE_INPUT_STYLE}
          />
          <div className="mt-4 flex justify-center">
            <Button  variant="outlined" className="mr-2" onClick={() => setAddChapterModalOpen(false)}>
              Cancel
            </Button>
            <Button  onClick={() => addChapter()}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        className="md:max-w-full 3xl:max-w-screen-3xl h-full"
        title={'Add Lesson'}
        isOpen={addLessonModalOpen}
        closeExplicitly
        closeModal={() => setAddLessonModalOpen(false)}
      >
        <div className="max-h-full overflow-y-auto">
          <div className="mt-3">
            <p className="text-sm text-gray-100">Serial Number</p>
            <input
              type="text"
              name="title"
              value={addLessonSerialNumber}
              onChange={e => {
                const val = e.target.value.replace(/[^\d]/g, '')
                setAddLessonSerialNumber(val)
              }}
              className={BASE_INPUT_STYLE}
            />
          </div>
          <div className="mt-3">
            <p className="text-sm text-gray-100">Title</p>
            <input
              type="text"
              name="title"
              value={addLessonTitle}
              onChange={e => {
                setAddLessonTitle(e.target.value)
              }}
              className={BASE_INPUT_STYLE}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex-1">
              <p className="text-sm text-gray-100">Content form</p>
              <Select options={bodyTypeOptions} selected={addLessonContentForm} change={e => setAddLessonContentForm(e)} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-100">Time to learn (minutes)</p>
              <input
                type="text"
                name="title"
                value={Number(addLessonTime) / 60}
                onChange={e => {
                  const val = e.target.value.replace(/[^\d]/g, '')
                  setAddLessonTime((Number(val) * 60).toFixed(0))
                }}
                className={BASE_INPUT_STYLE}
              />
            </div>
          </div>
          <div className="OEditor-hidden-rightbar mt-3">
            <OEditor value={addLessonDetails} onChange={setAddLessonDetails} />
          </div>
          <div className="clear-both"></div>
          <div className="mt-4 flex justify-center">
            <Button  variant="outlined" className="mr-2" onClick={() => setAddLessonModalOpen(false)}>
              Cancel
            </Button>
            <Button  onClick={() => addLesson()}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
