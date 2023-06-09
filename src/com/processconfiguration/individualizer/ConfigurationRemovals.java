/*******************************************************************************
 * Copyright � 2006-2011, www.processconfiguration.com
 *   
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *   
 * Contributors:
 *      Marcello La Rosa - initial API and implementation, subsequent revisions
 *      Florian Gottschalk - individualizer for YAWL
 *      Possakorn Pitayarojanakul - integration with Configurator and Individualizer
 ******************************************************************************/
package com.processconfiguration.individualizer;

import java.util.ArrayList;
import java.util.List;

public class ConfigurationRemovals {

	public class RemovedFlow {
		private String specificationID = null;
		private String netID = null;
		private String sourceID = null;
		private String targetID = null;

		RemovedFlow() {
		}

		RemovedFlow(String spec, String net, String source, String target) {
			setNetID(net);
			setSpecifictaionID(spec);
			setSourceID(source);
			setTargetID(target);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setSourceID(String id) {
			sourceID = id;
		}

		protected void setTargetID(String id) {
			targetID = id;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getSourceID() {
			return sourceID;
		}

		protected String getTargetID() {
			return targetID;
		}

	}

	public class RemovedTask {
		private String specificationID = null;
		private String netID = null;
		private String taskID = null;

		RemovedTask() {
		}

		RemovedTask(String spec, String net, String task) {
			setNetID(net);
			setSpecifictaionID(spec);
			setTaskID(task);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setTaskID(String id) {
			taskID = id;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getTaskID() {
			return taskID;
		}
	}

	public class RemovedCondition {
		private String specificationID = null;
		private String netID = null;
		private String conditionID = null;

		RemovedCondition() {
		}

		RemovedCondition(String spec, String net, String cond) {
			setNetID(net);
			setSpecifictaionID(spec);
			setConditionID(cond);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setConditionID(String id) {
			conditionID = id;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getConditionID() {
			return conditionID;
		}
	}

	public class BlockedCancelationRegion {
		private String specificationID = null;
		private String netID = null;
		private String taskID = null;

		BlockedCancelationRegion() {
		}

		BlockedCancelationRegion(String spec, String net, String task) {
			setNetID(net);
			setSpecifictaionID(spec);
			setTaskID(task);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setTaskID(String id) {
			taskID = id;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getTaskID() {
			return taskID;
		}
	}

	public class HiddenTask {
		private String specificationID = null;
		private String netID = null;
		private String taskID = null;

		HiddenTask() {
		}

		HiddenTask(String spec, String net, String task) {
			setNetID(net);
			setSpecifictaionID(spec);
			setTaskID(task);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setTaskID(String id) {
			taskID = id;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getTaskID() {
			return taskID;
		}
	}

	public class ChangedDecoration {
		private String specificationID = null;
		private String netID = null;
		private String taskID = null;
		private String type = null;
		private String newCode = null;

		ChangedDecoration() {
		}

		ChangedDecoration(String spec, String net, String task,
				String splitjoin, String code) {
			setNetID(net);
			setSpecifictaionID(spec);
			setTaskID(task);
			setNewCode(code);
			setType(splitjoin);
		}

		protected void setNetID(String id) {
			netID = id;
		}

		protected void setSpecifictaionID(String id) {
			specificationID = id;
		}

		protected void setTaskID(String id) {
			taskID = id;
		}

		protected void setType(String t) {
			type = t;
		}

		protected void setNewCode(String code) {
			newCode = code;
		}

		protected String getNetID() {
			return netID;
		}

		protected String getSpecificationID() {
			return specificationID;
		}

		protected String getTaskID() {
			return taskID;
		}

		protected String getType() {
			return type;
		}

		protected String getNewCode() {
			return newCode;
		}
	}

	private ArrayList<RemovedFlow> removedFlows = new ArrayList<RemovedFlow>();
	private ArrayList<RemovedTask> removedTasks = new ArrayList<RemovedTask>();
	private ArrayList<RemovedCondition> removedCondition = new ArrayList<RemovedCondition>();
	private ArrayList<HiddenTask> hiddenTasks = new ArrayList<HiddenTask>();
	private ArrayList<ChangedDecoration> changedDecorations = new ArrayList<ChangedDecoration>();
	private ArrayList<BlockedCancelationRegion> blockedCancelation = new ArrayList<BlockedCancelationRegion>();

	public void addRemovedFlow(String spec, String net, String source,
			String target) {
		removedFlows.add(new RemovedFlow(spec, net, source, target));
	}

	public void addRemovedTask(String spec, String net, String task) {
		removedTasks.add(new RemovedTask(spec, net, task));
	}

	public void addRemovedCondition(String spec, String net, String cond) {
		removedCondition.add(new RemovedCondition(spec, net, cond));
	}

	public void addHiddenTask(String spec, String net, String task) {
		hiddenTasks.add(new HiddenTask(spec, net, task));
	}

	public void addChangedDecoration(String spec, String net, String task,
			String splitjoin, String code) {
		changedDecorations.add(new ChangedDecoration(spec, net, task,
				splitjoin, code));
	}

	public void addBlockedCancelationRegion(String spec, String net, String task) {
		blockedCancelation.add(new BlockedCancelationRegion(spec, net, task));
	}

	public List<RemovedFlow> getRemovedFlows() {
		return removedFlows;
	}

	public List<RemovedTask> getRemovedTasks() {
		return removedTasks;
	}

	public List<RemovedCondition> getRemovedConditions() {
		return removedCondition;
	}

	public List<HiddenTask> getHiddenTasks() {
		return hiddenTasks;
	}

	public List<ChangedDecoration> getChangedDecorations() {
		return changedDecorations;
	}

	public List<BlockedCancelationRegion> getBlockedCancelationRegions() {
		return blockedCancelation;
	}

}
